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
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CHANGEPASSWORD, RESET } from "../../../redux/slices/persons/auth";

const Password = ({ label, name, value, handleChange }) => {
  const [show, setShow] = useState(false),
    { theme } = useSelector(({ auth }) => auth);

  return (
    <div className="position-relative">
      <MDBInput
        type={!show ? "password" : "text"}
        label={label}
        value={value}
        onChange={e => handleChange(name, e.target.value)}
        name="password"
        minLength={8}
        contrast={theme}
        required
      />
      <MDBIcon
        icon={show ? "eye" : "eye-slash"}
        className="custom-register-eye cursor-pointer"
        onClick={() => setShow(!show)}
      />
    </div>
  );
};

export default function PasswordForm({ visibility, setVisibility, email }) {
  const { theme, token, isSuccess } = useSelector(({ auth }) => auth),
    [form, setForm] = useState({
      old: "",
      new: "",
      cnew: "",
    }),
    dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setForm({
        old: "",
        new: "",
        cnew: "",
      });
      setVisibility(false);
      dispatch(RESET());
    }
  }, [isSuccess]);

  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = e => {
    e.preventDefault();

    if (form.new === form.cnew) {
      if (form.new !== form.old) {
        const _form = {
          email,
          old: form.old,
          password: form.new,
        };
        dispatch(CHANGEPASSWORD({ form: _form, token }));
      } else {
        toast.warn("New Password cannot be the same as Old Password!");
      }
    } else {
      toast.warn("New Password does not match!");
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
      <MDBModalDialog>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Change Password</MDBModalTitle>
          </MDBModalHeader>
          <form onSubmit={handleSubmit}>
            <MDBModalBody>
              <MDBRow>
                <MDBCol size={12}>
                  <Password
                    label="Old Password"
                    name="old"
                    value={form.old}
                    handleChange={handleChange}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-3">
                <MDBCol size={6}>
                  <Password
                    label="New Password"
                    name="new"
                    value={form.new}
                    handleChange={handleChange}
                  />
                </MDBCol>
                <MDBCol size={6}>
                  <Password
                    label="Confirm New Password"
                    name="cnew"
                    value={form.cnew}
                    handleChange={handleChange}
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
