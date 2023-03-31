import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";
import DefaultUser from "../assets/images/default.jpg";
import ErrorNull from "../assets/images/404.gif";
import ErrorBadRequest from "../assets/images/400.png";

export const PresetUser = DefaultUser;
export const ErrorPage = ErrorNull;
export const ErrorFalse = ErrorBadRequest;

export const BASE = "initial";
export const ENDPOINT = "http://localhost:5000";
// export const ENDPOINT = window.location.origin;

export const socket = io.connect(ENDPOINT);

export const register = data =>
  axios
    .post("auth/save", data)
    .then(() => true)
    .catch(err => toast.error(err.response.data.error));

export const handleTimer = mili => {
  const padTo2Digits = num => num.toString().padStart(2, "0");

  if (mili > 0) {
    let seconds = Math.floor(mili / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}`;
  } else {
    return "-:-:-";
  }
};

export const miliToHours = mili => {
  let seconds = mili / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;

  seconds = seconds % 60;
  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return hours;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatCurrency = num => {
  if (num && num > 0) {
    return num.toLocaleString("en-US", { style: "currency", currency: "PHP" });
  } else {
    return "-";
  }
};

export const fullName = fullName => {
  if (typeof fullName === "object") {
    const { fname, mname, lname, suffix } = fullName;
    let middleName = "";
    if (mname && mname.name) {
      middleName = `${mname.name
        .split(" ")
        .map(middle => middle.charAt(0).toUpperCase())
        .join("")}.`;
    }
    return `${lname.name}, ${fname} ${middleName} ${
      suffix ? `(${suffix})` : ""
    }`.replace(/^\s+|\s+$/gm, "");
  } else {
    return "-";
  }
};

export const roleBadge = role => {
  switch (role) {
    case "CASHIER":
      return "secondary";

    case "UTILITY":
      return "success";

    default:
      return "primary";
  }
};

export const getAge = age => {
  if (age) {
    var ageInMilliseconds = new Date() - new Date(age);
    return String(Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365));
  } else {
    return "-";
  }
};

export const fullMobile = mobile => {
  if (mobile) {
    return `+63 (${mobile.slice(0, 3)}) ${mobile.slice(3, 6)}-${mobile.slice(
      6,
      10
    )}`;
  } else {
    return "-";
  }
};

export const profileProgress = async auth => {
  if (auth) {
    const { fullName, address, verified, dob, alias, rate, bio } = auth;
    let validate = 0,
      requirements = [];
    const required = {
      Middlename: fullName.mname,
      Street: address.street,
      Barangay: address.barangay,
      City: address.city,
      Province: address.province,
      Region: address.region,
      Alias: alias,
      Birthday: dob,
      Email: verified,
      Rate: rate,
      Biography: bio,
    };

    const newArr = Object.keys(required);

    newArr.map(key => {
      if (required[key]) {
        validate += 1;
      } else {
        requirements.push(key);
      }
      return null;
    });

    return {
      requirements,
      progress: Math.floor((validate / newArr.length) * 100),
    };
  }
};

export const validateContactNumber = e => {
  if (
    (e.keyCode >= 48 && e.keyCode <= 58) ||
    (e.keyCode >= 96 && e.keyCode <= 105) ||
    e.keyCode === 8
  ) {
    return true;
  } else {
    e.preventDefault();
  }
};
