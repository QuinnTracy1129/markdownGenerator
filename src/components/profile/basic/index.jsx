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
  MDBTextArea,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { fullName } from "../../utilities";
import BasicForm from "./modal";

export default function ProfileBasic({ auth, view }) {
  const { theme } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false);

  return (
    <MDBCard background={theme.color} className={`${theme.text}`}>
      <MDBCardBody>
        <BasicForm
          visibility={visibility}
          setVisibility={setVisibility}
          auth={auth}
        />
        <MDBCardTitle
          className={`border-bottom border-${theme.border} mb-3 d-flex justify-content-between align-items-center pb-1`}
        >
          Basic Informations
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
          <MDBCol size={9}>
            <MDBInput
              label="Fullname"
              value={fullName(auth.fullName)}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
          <MDBCol size={3}>
            <MDBInput
              label="Gender"
              value={auth.isMale ? "Male" : "Female"}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-3">
          <MDBCol size={6}>
            <MDBInput
              label="Street"
              value={auth.address?.street || ""}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
          <MDBCol size={6}>
            <MDBInput
              label="Barangay"
              value={auth.address?.barangay || ""}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-3">
          <MDBCol size={4}>
            <MDBInput
              label="City"
              value={auth.address?.city || ""}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
          <MDBCol size={4}>
            <MDBInput
              label="Region"
              value={auth.address?.region || ""}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
          <MDBCol size={4}>
            <MDBInput
              label="Province"
              value={auth.address?.province || ""}
              contrast={theme.dark}
              readOnly
              className="bg-transparent"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol size={12}>
            <MDBTextArea
              rows={3}
              readOnly
              className="bg-transparent"
              label="Biography"
              contrast={theme.dark}
              value={auth.bio}
            />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
