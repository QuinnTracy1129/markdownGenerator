import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Initial from "../src/page/home";

//Errors
import ErrorBad from "./page/errors/bad";
import ErrorNull from "./page/errors/null";

//Dashboard
import Dashboard from "./page/platforms";

// Sessions
import Login from "./page/sessions/login";
import Register from "./page/sessions/register";

// Glocal Components
import UserProfile from "./components/profile";
import Attendances from "./components/attendance";

import { Admin, Manager, Cashier } from "./RootRoutes";
import { BASE } from "./components/utilities";
import { useSelector } from "react-redux";

const Routers = () => {
  const { auth } = useSelector(({ auth }) => auth);

  const handleRoutes = auth => {
    if (auth._id) {
      var routes = [];
      switch (auth.role) {
        case "ADMINISTRATOR":
          routes = Admin;
          break;

        case "MANAGER":
          routes = Manager;
          break;

        case "CASHIER":
          routes = Cashier;
          break;

        default:
          routes = [];
          break;
      }

      return routes.map(route => {
        if (route.children) {
          return route.children?.map(child => (
            <Route
              path={`${route.path}/${child.path}`}
              key={`${route.path}/${child.path}`}
              element={child.element}
            />
          ));
        } else {
          return (
            <Route path={route.path} key={route.path} element={route.element} />
          );
        }
      });
    }
  };

  return (
    <Routes>
      {/* Initial */}
      <Route path="/" element={<Initial />} />
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}

      {/* Platforms */}
      {/* <Route path={BASE} element={<Dashboard />}> */}
      {/* <Route
          path="profile"
          element={<UserProfile auth={auth} view={false} />}
        /> */}
      {/* {handleRoutes(auth)} */}

      {/* Error 400 */}
      {/* <Route path="" element={<ErrorBad />} /> */}
      {/* </Route> */}

      {/* <Route path="attendance/:id" element={<Attendances />} /> */}

      {/* Sessions */}
      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route path="register" element={<Register />} /> */}

      {/* Error 404 */}
      <Route path="*" element={<ErrorNull />} />
    </Routes>
  );
};

export default Routers;
