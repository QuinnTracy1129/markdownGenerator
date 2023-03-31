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
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { formatCurrency, fullMobile, getAge } from "../../utilities";
import OthersForm from "./modal";

export default function ProfileOthers({ auth, view }) {
  const { theme } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false);

  return (
    <MDBCard background={theme.color} className={`${theme.text} my-4`}>
      <MDBCardBody>
        <OthersForm
          visibility={visibility}
          setVisibility={setVisibility}
          auth={auth}
        />
        <MDBCardTitle
          className={`border-bottom border-${theme.border} mb-3 d-flex justify-content-between align-items-center pb-1`}
        >
          Other Informations
          {!view && (
            <MDBTooltip
              tag="span"
              wrapperClass="d-inline-block"
              title="Update Information"
            >
              <MDBBtn
                size="sm"
                color="info"
                className="py-1"
                onClick={() => setVisibility(!visibility)}
              >
                <MDBIcon icon="pen-alt" />
              </MDBBtn>
            </MDBTooltip>
          )}
        </MDBCardTitle>
        <MDBRow>
          <MDBCol size={6}>
            <MDBInput
              label="Alias"
              value={auth.alias || ""}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
          <MDBCol size={6}>
            <MDBInput
              label="Mobile"
              value={fullMobile(auth.mobile)}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-3">
          <MDBCol size={4}>
            <MDBInput
              label="Birthday"
              value={auth.dob ? new Date(auth.dob).toDateString() : "-"}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
          <MDBCol size={4}>
            <MDBInput
              label="Age"
              value={getAge(auth.dob)}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
          <MDBCol size={4}>
            <MDBInput
              label="Hourly Rate"
              value={formatCurrency(auth.rate) || ""}
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
