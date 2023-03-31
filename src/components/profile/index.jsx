import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { profileProgress } from "../utilities";
import "./index.css";
import ProfilePhoto from "./photo";
import ProfileBasic from "./basic";
import ProfileOthers from "./others";
import ProfileCredentials from "./credentials";

const UserProfile = ({ auth, view = true }) => {
  const [requirements, setRequirements] = useState([]),
    [form, setForm] = useState({
      fullName: {
        fname: "",
        mname: "",
        lname: "",
        suffix: "",
      },
      address: {
        street: "",
        barangay: "",
        city: "",
        province: "",
        region: "",
      },
      dob: "",
      mobile: "",
      email: "",
      alias: "",
      isMale: false,
      verified: false,
      rate: 0,
      bio: "",
    }),
    [progress, setProgress] = useState("0");

  useEffect(() => {
    if (auth._id) {
      setForm(auth);
      profileProgress(auth).then(res => {
        setProgress(res.progress);
        setRequirements(res.requirements);
      });
    }
  }, [auth]);

  return (
    <MDBContainer className={`${!view && "mt-3 mt-md-5"}`}>
      <MDBRow>
        <ProfilePhoto
          auth={form}
          progress={progress}
          requirements={requirements}
          view={view}
        />
        <MDBCol md={8} size={12} className="offset-md-0 transition-all">
          <ProfileBasic auth={form} view={view} />
          <ProfileOthers auth={form} view={view} />
          <ProfileCredentials auth={form} view={view} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default UserProfile;
