import React from "react";
import { MDBCol, MDBContainer, MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

const SettingsCalculator = () => {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <MDBCol className="custom-notification-container position-relative pb-4 mx-5">
      <MDBIcon
        onClick={() => window.open("Calculator:///")}
        icon="calculator"
        size="lg"
        className={`custom-notification-icon ${theme.bg} ${theme.text} border border-${theme.border} cursor-pointer`}
      />
      <MDBContainer className="ms-5 p-0">
        <MDBTypography
          tag="h6"
          className={`custom-notification-title fw-bold p-0 w-0 ${theme.text} text-capitalize`}
        >
          Calculator
        </MDBTypography>
        <p className={`custom-notification-label p-0 w-0 ${theme.text}`}>
          Click the icon to open calculator.
        </p>
      </MDBContainer>
    </MDBCol>
  );
};

export default SettingsCalculator;
