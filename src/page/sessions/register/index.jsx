import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBBtn,
  MDBSpinner,
  MDBTypography,
  MDBCardTitle,
  MDBRow,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import Company from "../../../fakeDb/company";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { register, validateContactNumber } from "../../../components/utilities";
import { SAVE, RESET } from "../../../redux/slices/persons/rubrics";

const Register = () => {
  const [show, setShow] = useState({ pass: false, cpass: false }),
    [isLoading, setIsLoading] = useState(false),
    [rubric, setRubric] = useState({
      name: "",
    }),
    [role, setRole] = useState("CASHIER"),
    { catalogs, isSuccess } = useSelector(({ rubrics }) => rubrics),
    { auth } = useSelector(({ auth }) => auth),
    [isAdmin, setIsAdmin] = useState(false),
    [inputOptions, setInputOptions] = useState({}),
    [roleOptions, setRoleOptions] = useState({}),
    navigate = useNavigate(),
    dispatch = useDispatch();

  useEffect(() => {
    document.title = `${Company.name} | Register`;
  }, []);

  useEffect(() => {
    if (isSuccess) {
      if (auth && auth.role !== "MANAGER" && auth.role !== "ADMINISTRATOR") {
        toast.info("The item you added is pending for approval.");
      }
      dispatch(RESET());
    }
  }, [isSuccess, auth]);

  useEffect(() => {
    if ((auth && auth.role === "MANAGER") || auth.role === "ADMINISTRATOR") {
      setIsAdmin(true);
    }
  }, [auth]);

  useEffect(() => {
    if (catalogs.length > 0) {
      let newObj = {},
        roleObj = {};
      catalogs.map((catalog, index) => (newObj[index] = catalog.name));
      Company.employees.map(role => (roleObj[role] = role));
      setInputOptions(newObj);
      setRoleOptions(roleObj);
    }
  }, [catalogs]);

  const handleSubmit = e => {
    e.preventDefault();

    setIsLoading(true);
    const { fname, mobile, email, pass, cpass } = e.target;
    if (isAdmin) {
      const form = {
        fullName: {
          fname: fname.value,
          lname: rubric._id,
        },
        role,
        mobile: mobile.value,
        email: email.value,
        password: "password",
      };
      register(form).then(res => {
        if (res) {
          toast.success(`Registered ${fname.value} successfully!`);
          setTimeout(window.close, 2500);
        }
      });
    } else {
      if (pass.value === cpass.value) {
        const form = {
          fullName: {
            fname: fname.value,
            lname: rubric._id,
          },
          mobile: mobile.value,
          email: email.value,
          password: pass.value,
        };
        register(form).then(res => {
          if (res) {
            navigate("/login");
            toast.success(`Welcome aboard ${fname.value}!`);
          }
        });
      } else {
        toast.warn("Passwords does not match!");
      }
    }
    setIsLoading(false);
  };

  const handleRubric = async () => {
    document.getElementById("email").focus();
    const { value: _rubric } = await Swal.fire({
      title: "Choose a rubric",
      text: "If you cant find yours, click the icon beside the Last name",
      input: "select",
      inputOptions,
    });

    if (_rubric) {
      setRubric(catalogs[Number(_rubric)]);
    }
  };

  const handleRole = async () => {
    document.getElementById("email").focus();
    const { value: _role } = await Swal.fire({
      title: "Choose a role",
      input: "select",
      inputOptions: roleOptions,
    });

    if (_role) {
      setRole(_role);
    }
  };

  const handleNew = async () => {
    const { value: _new } = await Swal.fire({
      title: "Add a new rubric",
      input: "text",
    });

    if (_new) {
      if (auth && auth.role === "MANAGER" && auth.role === "ADMINISTRATOR") {
        dispatch(SAVE({ form: { name: _new.toUpperCase(), approved: true } }));
      } else {
        dispatch(SAVE({ form: { name: _new.toUpperCase() } }));
      }
    }
  };

  return (
    <MDBContainer fluid style={{ backgroundColor: "#f6e7d8", height: "100vh" }}>
      <MDBCol size={10} className="offset-1 text-center">
        <img
          src={Company.logo}
          style={{ maxWidth: 200 }}
          className="my-2 w-100"
          alt="Company logo"
        />
        <MDBCard>
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <MDBCardTitle>Basic Information</MDBCardTitle>
              <MDBRow>
                <MDBCol md={4} className="mb-2 mb-md-0">
                  <MDBInput
                    type="text"
                    label="First name"
                    name="fname"
                    onChange={e =>
                      (e.target.value = String(e.target.value).toUpperCase())
                    }
                    onInvalid={e =>
                      e.target.setCustomValidity(
                        "Please input your First name."
                      )
                    }
                    onInput={e => e.target.setCustomValidity("")}
                    required
                    autoFocus
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <div className="position-relative">
                    <MDBInput
                      type="text"
                      label="Last name"
                      value={rubric.name}
                      onFocus={handleRubric}
                      required
                    />
                    <MDBIcon
                      title="Click here to add a rubric"
                      icon="info-circle"
                      className="custom-register-eye cursor-pointer"
                      onClick={handleNew}
                    />
                  </div>
                </MDBCol>

                <MDBCol md={4} className="mt-2 mt-md-0">
                  {isAdmin ? (
                    <MDBInput
                      type="text"
                      label="Role"
                      value={role}
                      onFocus={handleRole}
                    />
                  ) : (
                    <MDBInput
                      type="text"
                      label="Mobile (+63)"
                      name="mobile"
                      onInvalid={e =>
                        e.target.setCustomValidity(
                          "This can also be used for logging in."
                        )
                      }
                      onInput={e => e.target.setCustomValidity("")}
                      onKeyDown={validateContactNumber}
                      maxLength={10}
                      required
                    />
                  )}
                </MDBCol>
              </MDBRow>

              <MDBCardTitle className="mt-3">Credentials</MDBCardTitle>
              <MDBRow>
                <MDBCol md={isAdmin ? 6 : 4} className="mb-2 mb-md-0">
                  <MDBInput
                    type="email"
                    label="E-mail Address"
                    name="email"
                    id="email"
                    onInvalid={e =>
                      e.target.setCustomValidity(
                        "Provide a valid E-mail Address."
                      )
                    }
                    onInput={e => e.target.setCustomValidity("")}
                    required
                  />
                </MDBCol>

                {isAdmin ? (
                  <MDBCol md={6}>
                    <MDBInput
                      type="text"
                      label="Mobile (+63)"
                      name="mobile"
                      onInvalid={e =>
                        e.target.setCustomValidity(
                          "This can also be used for logging in."
                        )
                      }
                      onInput={e => e.target.setCustomValidity("")}
                      onKeyDown={validateContactNumber}
                      maxLength={10}
                      required
                    />
                  </MDBCol>
                ) : (
                  <>
                    <MDBCol md={4}>
                      <div className="position-relative">
                        <MDBInput
                          type={!show.pass ? "password" : "text"}
                          label="Password"
                          name="pass"
                          minLength={8}
                          onInvalid={e =>
                            e.target.setCustomValidity(
                              "Password is used for validation."
                            )
                          }
                          onInput={e => e.target.setCustomValidity("")}
                          required
                        />
                        <MDBIcon
                          icon={show.pass ? "eye" : "eye-slash"}
                          className="custom-register-eye cursor-pointer"
                          onClick={() => setShow({ ...show, pass: !show.pass })}
                        />
                      </div>
                    </MDBCol>
                    <MDBCol md={4} className="mt-2 mt-md-0">
                      <div className="position-relative">
                        <MDBInput
                          type={!show.cpass ? "password" : "text"}
                          label="Confirm Password"
                          name="cpass"
                          minLength={8}
                          onInvalid={e =>
                            e.target.setCustomValidity("Confirm your Password.")
                          }
                          onInput={e => e.target.setCustomValidity("")}
                          required
                        />
                        <MDBIcon
                          icon={show.cpass ? "eye" : "eye-slash"}
                          className="custom-register-eye cursor-pointer"
                          onClick={() =>
                            setShow({ ...show, cpass: !show.cpass })
                          }
                        />
                      </div>
                    </MDBCol>
                  </>
                )}
              </MDBRow>

              <MDBBtn
                className="w-100 mt-3"
                color="success"
                disabled={isLoading}
              >
                {isLoading ? <MDBSpinner grow size="sm" /> : "Register"}
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
        {!isAdmin && (
          <MDBCard className="mt-2">
            <MDBCardBody>
              <MDBTypography className="mb-0">
                Already have an account?&nbsp;
                <span
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-primary hover-line"
                >
                  Log in
                </span>
                .
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        )}
      </MDBCol>
    </MDBContainer>
  );
};

export default Register;
