import React, { useState } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import PasswordForm from "./password";
import VerifyForm from "./verify";
import { toast } from "react-toastify";

export default function ProfileCredentials({ auth, view }) {
  const { theme } = useSelector(({ auth }) => auth),
    [password, setPassword] = useState(false),
    [verify, setVerify] = useState(false);

  return (
    <MDBCard background={theme.color} className={`${theme.text}`}>
      <MDBCardBody>
        <VerifyForm
          visibility={verify}
          setVisibility={setVerify}
          alias={auth.alias}
          email={auth.email}
          _id={auth._id}
        />
        <PasswordForm
          visibility={password}
          setVisibility={setPassword}
          email={auth.email}
        />
        <MDBCardTitle
          className={`border-bottom border-${theme.border} mb-3 d-flex justify-content-between align-items-center pb-1`}
        >
          Credentials
          {!view && (
            <MDBBtnGroup>
              {!auth.verified && (
                <MDBTooltip
                  tag="span"
                  wrapperClass="d-inline-block"
                  title="Verify E-mail Address"
                >
                  <MDBBtn
                    size="sm"
                    className="py-1"
                    onClick={() => {
                      if (navigator.onLine) {
                        setVerify(!verify);
                      } else {
                        toast.warn("You are offline!");
                      }
                    }}
                  >
                    <MDBIcon icon="check-circle" />
                  </MDBBtn>
                </MDBTooltip>
              )}
              <MDBTooltip
                tag="span"
                wrapperClass="d-inline-block"
                title="Change Password"
              >
                <MDBBtn
                  size="sm"
                  color="info"
                  className="py-1"
                  onClick={() => setPassword(!password)}
                >
                  <MDBIcon icon="lock" />
                </MDBBtn>
              </MDBTooltip>
            </MDBBtnGroup>
          )}
        </MDBCardTitle>
        <MDBRow>
          <MDBCol size={9}>
            <MDBInput
              label="E-mail Address"
              value={auth.email}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
          <MDBCol size={3}>
            <MDBInput
              label="Verified"
              value={auth.verified ? "Yes" : "No"}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
