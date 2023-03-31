import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateContactNumber } from "../../utilities";
import Swal from "sweetalert2";
import { UPDATE } from "../../../redux/slices/persons/auth";
import axios from "axios";
import Company from "../../../fakeDb/company";

export default function VerifyForm({
  visibility,
  setVisibility,
  email,
  _id,
  alias,
}) {
  const { theme, token, isSuccess } = useSelector(({ auth }) => auth),
    [code, setCode] = useState(""),
    dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setCode("");
      setVisibility(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    setCode(Math.floor(Math.random() * 100000) + 900000);
  }, []);

  useEffect(() => {
    if (visibility && code) {
      axios.post(`/mailer/code`, {
        to: email,
        username: alias || email,
        subject: `${Company.name} Email Verification`,
        message: `Please use the code below in ${Company.name} Website to verify your email`,
        code,
      });
    }
  }, [visibility, code, email, alias]);

  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = e => {
    e.preventDefault();

    const _code = Number(e.target.code.value);

    if (_code === code) {
      const user = {
        _id,
        form: {
          verified: true,
        },
      };
      dispatch(UPDATE({ user, token }));
    } else {
      toast.warn("Incorrect code!");
    }
  };

  return (
    <MDBModal
      show={visibility}
      staticBackdrop
      setShow={setVisibility}
      tabIndex="-1"
    >
      <MDBModalDialog>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Verify Email</MDBModalTitle>
          </MDBModalHeader>
          <form onSubmit={handleSubmit}>
            <MDBModalBody>
              <MDBInput
                label="6 digit code"
                name="code"
                contrast={theme.dark}
                maxLength={6}
                required
                onKeyDown={validateContactNumber}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                type="button"
                color={theme.color}
                className="shadow-0"
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "Closing this will void current code!",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, void it!",
                  }).then(result => {
                    if (result.isConfirmed) {
                      toggleShow();
                    }
                  });
                }}
              >
                Close
              </MDBBtn>
              <MDBBtn color="success">Verify</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
