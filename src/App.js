import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardText,
  MDBCol,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import MarkdownModal from "./modal";
// import DevTools from "devtools-detect";

const App = () => {
  const [text, setText] = useState(""),
    [datas, setDatas] = useState([]),
    [modal, setModal] = useState(false);

  const isJSON = str => {
    try {
      JSON.parse(str);
    } catch (error) {
      return false;
    }

    return true;
  };

  const handleJSON = obj => {
    const newArr = [];
    const loopObject = (obj, parameter = "") => {
      for (let key in obj) {
        let form = {
          parameter: `${parameter}${key}`,
          datatype: typeof obj[key],
          mandatory: "Optional",
          min: "",
          max: "",
          description: "",
        };

        if (form.datatype === "object") {
          if (Array.isArray(obj[key])) {
            form.parameter += "[]";

            // key is an array, loop through its items
            if (typeof obj[key][0] === "object") {
              loopObject(obj[key][0], `${form.parameter}.`);
            } else {
              form.datatype = `array<${typeof obj[key][0]}>`;

              newArr.push(form);
            }
          } else {
            // key is an object, call function recursively
            loopObject(obj[key], `${form.parameter}.`);
          }
        } else {
          newArr.push(form);
        }
      }
    };

    loopObject(obj);

    setDatas(newArr);
  };

  const handleGenerate = () => {
    const input = document.getElementById("text-obj");

    if (text) {
      if (isJSON(text)) {
        handleJSON(JSON.parse(text));

        setModal(true);
      } else {
        toast.warn("Invalid JSON format!");
        input.focus();
      }
    } else {
      toast.warn("Paste a JSON first!");
      input.focus();
    }
  };

  return (
    <div className="markdown-container py-5">
      <MDBCol md={10} className="offset-md-1">
        <MDBCard shadow="0" border="primary" background="light">
          <MDBCardHeader>JSON to Markdown Converter</MDBCardHeader>
          <MDBCardBody>
            <MDBTypography className="mb-0">
              Paste your JSON below
            </MDBTypography>
            <MDBTypography>
              <small>
                <i>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://codebeautify.org/jsonviewer"
                  >
                    Beautify your JSON
                  </a>
                  &nbsp;for better experience
                </i>
              </small>
            </MDBTypography>
            <MDBTextArea
              id="text-obj"
              onChange={e => setText(e.target.value)}
              rows={3}
            />
          </MDBCardBody>
          <MDBCardFooter>
            <MDBBtn color="info" onClick={handleGenerate}>
              configure Markdown
            </MDBBtn>
          </MDBCardFooter>
        </MDBCard>
        <MDBCard
          shadow="0"
          border="primary"
          background="light"
          className="mt-3"
        >
          <MDBCardHeader className="pt-1 pb-0">Disclaimer</MDBCardHeader>
          <MDBCardBody className="py-1">
            <MDBCardText>
              <i>
                Usage may differ depending on data, this is based on a
                particular set of response and may not cover all kinds of
                responses yet.
              </i>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MarkdownModal
        text={text}
        datas={datas}
        setDatas={setDatas}
        modal={modal}
        setModal={setModal}
      />
      <ToastContainer
        theme="dark"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
};

export default App;
