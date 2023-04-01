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

  const handleGenerate = () => {
    const input = document.getElementById("text-obj");

    if (text) {
      if (isJSON(text)) {
        const json = JSON.parse(text);

        setDatas(
          Object.keys(json)?.map(key => {
            let form = {
              parameter: key,
              type: typeof json[key],
              mandatory: false,
              description: "",
            };

            if (Array.isArray(json[key])) {
              const initial = json[key][0];

              if (typeof initial === "object") {
                form.type = "array";

                const children = Object.keys(initial);

                form.children = children.map(child => {
                  let _form = {
                    parameter: child,
                    type: typeof initial[child],
                    mandatory: false,
                    description: "",
                  };

                  if (Array.isArray(initial[child])) {
                    _form.type = "array";
                  }

                  return _form;
                });
              } else {
                form.type = `array<${typeof initial}>`;
              }
            } else if (form.type === "object") {
              const children = Object.keys(json[key]);

              form.children = children.map(child => {
                let _form = {
                  parameter: child,
                  type: typeof json[key][child],
                  mandatory: false,
                  description: "",
                };

                if (Array.isArray(json[key][child])) {
                  if (typeof json[key][child][0] === "object") {
                    _form.type = "array";
                  } else {
                    _form.type = `array<${typeof json[key][child][0]}>`;
                  }
                }

                return _form;
              });
            }

            return form;
          })
        );
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
