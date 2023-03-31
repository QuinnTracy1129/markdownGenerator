import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MDBNavbarItem,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
} from "mdb-react-ui-kit";
import { PresetUser, ENDPOINT, BASE } from "../../utilities";
import { useSelector } from "react-redux";
import axios from "axios";

const NavbarProfile = () => {
  const [visibility, setVisibility] = useState(false),
    [items, setItems] = useState([]),
    { auth, theme, token } = useSelector(state => state.auth),
    navigate = useNavigate();

  useEffect(() => {
    if (auth._id) {
      setItems([
        {
          name: auth.alias || "My Profile",
          icon: "user-circle",
          path: `/${BASE}/profile`,
          external: false,
        },
        {
          name: "Time Records",
          icon: "calendar-alt",
          path: `/attendance/${auth._id}`,
          external: true,
        },
      ]);
    }
  }, [auth]);

  const handleLogout = () => {
    if (token) {
      toast.info("Removing all your cache.");
      setVisibility(false);
      localStorage.removeItem("token");

      axios
        .get(`attendances/${auth._id}/logout`, {
          headers: {
            Authorization: `QTracy ${token}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            window.location.href = "/login";
          }, 2500);
        })
        .catch(err => {
          toast.error(err.response.data.error);
        });
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const handleEvent = e =>
      e.target.id !== "my-profile" && setVisibility(false);

    if (visibility) {
      setTimeout(() => window.addEventListener("click", handleEvent), 100);
    } else {
      window.removeEventListener("click", handleEvent);
    }
    return () => window.removeEventListener("click", handleEvent);
  }, [visibility]);

  return (
    <MDBNavbarItem className={`${theme.text} me-3`}>
      <div className="dropdown">
        <MDBBtn
          className="p-0 mx-2 dropbtn"
          onClick={() => setVisibility(!visibility)}
        >
          <img
            id="my-profile"
            src={`${ENDPOINT}/assets/profile/${auth.email}.jpg`}
            alt={auth.email}
            height={28}
            width={28}
            onError={e => (e.target.src = PresetUser)}
          />
        </MDBBtn>
        <div
          className={`custom-dropdown-content ${
            visibility ? "d-block" : "d-none"
          }`}
          style={{ backgroundColor: theme.bgHex }}
        >
          <MDBListGroup>
            {items.map((item, index) => (
              <MDBListGroupItem
                key={`profile-item-${index}`}
                onClick={() => {
                  setVisibility(!visibility);
                  if (item.external) {
                    window.open(
                      item.path,
                      item.name,
                      "top=100px,width=768px,height=650px"
                    );
                  } else {
                    navigate(item.path);
                  }
                }}
                color={theme.color}
                className="cursor-pointer text-capitalize border-0"
              >
                <MDBIcon icon={item.icon} />
                &nbsp;
                {item.name}
              </MDBListGroupItem>
            ))}

            <MDBListGroupItem
              onClick={handleLogout}
              color={theme.color}
              className="cursor-pointer border-0"
            >
              <MDBIcon icon="sign-out-alt" />
              &nbsp;Logout
            </MDBListGroupItem>
          </MDBListGroup>
        </div>
      </div>
    </MDBNavbarItem>
  );
};

export default NavbarProfile;
