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
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UPDATE, RESET } from "../../../redux/slices/persons/auth";
import { getAge, validateContactNumber } from "../../utilities";

export default function OthersForm({ visibility, setVisibility, auth }) {
  const { theme, token, isSuccess } = useSelector(({ auth }) => auth),
    [form, setForm] = useState({
      alias: "",
      mobile: "",
      dob: "",
      rate: 0,
    }),
    dispatch = useDispatch();

  useEffect(() => {
    if (auth._id) {
      setForm(auth);
    }
  }, [auth]);

  useEffect(() => {
    if (isSuccess) {
      setVisibility(false);
      dispatch(RESET());
    }
  }, [isSuccess]);

  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = e => {
    e.preventDefault();

    if (JSON.stringify(auth) !== JSON.stringify(form)) {
      const user = {
        _id: form._id,
        form: {
          alias: form.alias,
          mobile: form.mobile,
          dob: form.dob,
          rate: form.rate,
        },
      };
      dispatch(UPDATE({ user, token }));
    } else {
      toast.warn("No changes found!");
    }
  };

  const handleChange = (name, value) =>
    setForm({
      ...form,
      [name]: value,
    });

  return (
    <MDBModal
      show={visibility}
      staticBackdrop
      setShow={setVisibility}
      tabIndex="-1"
    >
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Update Other Information</MDBModalTitle>
          </MDBModalHeader>
          <form onSubmit={handleSubmit}>
            <MDBModalBody>
              <MDBRow>
                <MDBCol size={6}>
                  <MDBInput
                    label="Alias"
                    value={form.alias}
                    onChange={e => handleChange("alias", e.target.value)}
                    contrast={theme.dark}
                  />
                </MDBCol>
                <MDBCol size={6}>
                  <MDBInput
                    label="Mobile (+63)"
                    value={form.mobile}
                    onChange={e => handleChange("mobile", e.target.value)}
                    contrast={theme.dark}
                    maxLength={10}
                    required
                    onKeyDown={validateContactNumber}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol size={6}>
                  <MDBInput
                    type="date"
                    label="Birthday"
                    value={form.dob}
                    onChange={e => handleChange("dob", e.target.value)}
                    contrast={theme.dark}
                  />
                </MDBCol>
                <MDBCol size={6}>
                  <MDBInput
                    label="Age"
                    value={getAge(form.dob)}
                    contrast={theme.dark}
                    readOnly
                    className="bg-transparent"
                  />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                type="button"
                color={theme.color}
                className="shadow-0"
                onClick={toggleShow}
              >
                Close
              </MDBBtn>
              <MDBBtn color="success">Save changes</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
