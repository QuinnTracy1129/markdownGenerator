import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBSpinner,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../../redux/slices/persons/auth";
import Company from "../../../fakeDb/company";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE } from "../../../components/utilities";

const Login = () => {
  const { isLoading, auth } = useSelector(state => state.auth),
    [show, setShow] = useState(false),
    dispatch = useDispatch(),
    navigate = useNavigate();

  useEffect(() => {
    document.title = `${Company.name} | Login`;
    if (auth && auth._id) {
      toast.info(
        `Hello, ${auth.isMale ? "Mr" : "Mrs"}. ${auth.alias || auth.email}`
      );
      navigate(`/${BASE}/dashboard`);
    }
  }, [auth, navigate]);

  const handleSubmit = e => {
    e.preventDefault();

    const { email, password } = e.target;

    var _identifier = email.value;

    if (!isNaN(Number(_identifier))) {
      _identifier = Number(_identifier);
    }

    if (Company.isTrial) {
      const endTrial = new Date(Company.start),
        today = new Date();

      endTrial.setDate(endTrial.getDate() + Company.trial);

      var _time = endTrial.getTime() - today.getTime();

      var _days = _time / (1000 * 3600 * 24);

      if (_days > 0) {
        if (_days <= 10) {
          toast.warn(
            `You have ${Math.round(_days)}day(s) left for your trial.`
          );
        }
        handleCredentials(_identifier, password.value);
      } else {
        toast.error("Your trial has expired.");
      }
    } else {
      handleCredentials(_identifier, password.value);
    }
  };

  const handleCredentials = (email, password) => {
    dispatch(
      LOGIN({
        email,
        password,
      })
    );
  };

  return (
    <MDBContainer fluid style={{ backgroundColor: "#f6e7d8", height: "100vh" }}>
      <MDBCol
        size={10}
        sm={10}
        md={8}
        lg={6}
        xl={4}
        className="offset-1 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-4 text-center"
      >
        <img
          src={Company.logo}
          style={{ maxWidth: 200 }}
          className="my-2 w-100"
          alt="Company logo"
        />
        <MDBCard>
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <MDBInput
                type="text"
                label="E-mail Address / Mobile"
                name="email"
                onInvalid={e =>
                  e.target.setCustomValidity("Identification is required.")
                }
                onInput={e => e.target.setCustomValidity("")}
                required
                autoFocus
              />
              <div className="position-relative my-3">
                <MDBInput
                  type={!show ? "password" : "text"}
                  label="Password"
                  name="password"
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
                  icon={show ? "eye" : "eye-slash"}
                  className="custom-register-eye cursor-pointer"
                  onClick={() => setShow(!show)}
                />
              </div>
              <MDBBtn className="w-100" color="success" disabled={isLoading}>
                {isLoading ? <MDBSpinner grow size="sm" /> : "log in"}
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
        <MDBCard className="mt-2">
          <MDBCardBody>
            <MDBTypography className="mb-0">
              New to {Company.name}?&nbsp;
              <span
                onClick={() => navigate("/register")}
                className="cursor-pointer text-primary hover-line"
              >
                Create an account
              </span>
              .
            </MDBTypography>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBContainer>
  );
};

export default Login;
