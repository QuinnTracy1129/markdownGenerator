import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBCol,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBadge,
} from "mdb-react-ui-kit";
import Company from "../../fakeDb/company";
import { useSelector } from "react-redux";
import NavbarProfile from "./profile";
// import NavbarNotifications from "./notification";
// import NavbarTodo from "./todo";
import NavSettings from "./settings";
import "./index.css";
import { roleBadge } from "../utilities";

const TopNavigation = ({ toggle }) => {
  const { theme, auth } = useSelector(state => state.auth);

  return (
    <MDBNavbar
      expand="lg"
      dark={theme.dark}
      className={theme.topbar}
      fixed="top"
      style={{ minWidth: "450px" }}
    >
      <MDBContainer fluid className="py-2 transition-all">
        <MDBCol size={1}>
          {toggle ? (
            <MDBBtn
              onClick={toggle}
              size="sm"
              color="transparent"
              className="shadow-0"
            >
              <MDBIcon icon="bars" size="lg" className="custom-navbar-icon" />
            </MDBBtn>
          ) : (
            <MDBNavbarBrand className={`cursor-pointer ${theme.text}`}>
              {Company.name}
            </MDBNavbarBrand>
          )}
        </MDBCol>

        <MDBCol>
          <MDBNavbarNav className="d-flex flex-row justify-content-between">
            <MDBNavbarItem className={`${theme.text} ms-md-5 ms-2`}>
              <MDBBadge pill color={roleBadge(auth.role)}>
                {auth.role}
              </MDBBadge>
            </MDBNavbarItem>
            <span className="d-flex">
              {/* <NavbarTodo /> */}
              {/* <NavbarNotifications /> */}
              <NavSettings />
              <NavbarProfile />
            </span>
          </MDBNavbarNav>
        </MDBCol>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default TopNavigation;
