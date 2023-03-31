import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBProgress,
  MDBProgressBar,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { ENDPOINT, PresetUser } from "../../utilities";
import { UPLOAD } from "../../../redux/slices/persons/auth";
import { toast } from "react-toastify";

export default function ProfilePhoto({ auth, progress, requirements, view }) {
  const { theme, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const handleImageChange = e => {
    const reader = new FileReader();
    reader.onload = e => {
      let image = new Image();

      image.src = e.target.result;

      image.onload = function () {
        if (this.width === this.height) {
          if (this.width <= 300) {
            dispatch(
              UPLOAD({
                data: {
                  path: `profile`,
                  base64: reader.result.split(",")[1],
                  name: `${auth.email}.jpg`,
                },
                token,
              })
            );
          } else {
            toast.warn("Maximum size is 300 pixels and below.");
          }
        } else {
          toast.warn("Proportion must be 1:1");
        }
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <MDBCol md={4} size={12} className="offset-md-0 transition-all mb-4">
      <MDBCard background={theme.color} className={`${theme.text}`}>
        <MDBCardBody className="text-center">
          <MDBCardTitle
            className={`border-bottom border-${theme.border} mb-3 text-start pb-1`}
          >
            Profile Image
          </MDBCardTitle>
          <MDBCardImage
            src={`${ENDPOINT}/assets/profile/${auth.email}.jpg`}
            className="mx-auto rounded img-max img-fluid mb-1"
            onError={e => (e.target.src = PresetUser)}
          />
          {view ? (
            <MDBCardText className="mb-0">{auth.bio}</MDBCardText>
          ) : (
            <>
              <MDBTooltip
                tag="span"
                wrapperClass="d-inline-block w-100"
                title={requirements.join(", ")}
              >
                <MDBProgress
                  height={15}
                  className={`cursor-pointer border border-${theme.border}`}
                >
                  <MDBProgressBar
                    striped
                    animated
                    bgColor="info"
                    width={progress}
                    valuemin={0}
                    valuemax={100}
                  >
                    {progress}%
                  </MDBProgressBar>
                </MDBProgress>
              </MDBTooltip>
              <MDBTooltip
                tag="span"
                wrapperClass="d-inline-block"
                title="Change your profile image!"
                placement="bottom"
              >
                <label
                  htmlFor="upload-profile"
                  className="mt-2 btn btn-info btn-sm"
                >
                  Upload image
                </label>
                <input
                  type="file"
                  id="upload-profile"
                  onChange={handleImageChange}
                  className="d-none"
                  accept="image/*"
                />
              </MDBTooltip>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
