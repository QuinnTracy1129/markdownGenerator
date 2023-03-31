import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import "./index.css";
import MarkdownModal from "./modal";

const Initial = () => {
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
        const json = JSON.parse(text),
          keys = Object.keys(json);

        var datas = keys.map(key => {
          var form = {
            parameter: key,
            type: typeof json[key],
            mandatory: false,
            description: "",
          };

          if (Array.isArray(json[key])) {
            const children = Object.keys(json[key][0]);

            form.type = "array";
            form.children = children.map(child => {
              var _form = {
                parameter: child,
                type: typeof json[key][0][child],
                mandatory: false,
                description: "",
              };

              if (_form.type === "object") {
                if (Array.isArray(json[key][0][child])) {
                  _form.type = "array";
                }
              }

              return _form;
            });
          } else if (form.type === "object") {
            const children = Object.keys(json[key]);

            form.children = children.map(child => {
              var _form = {
                parameter: child,
                type: typeof json[key][child],
                mandatory: false,
                description: "",
              };

              if (_form.type === "object") {
                if (Array.isArray(json[key][child])) {
                  _form.type = "array";
                }
              }

              return _form;
            });
          }

          return form;
        });

        setDatas(datas);
        setModal(true);
      } else {
        input.focus();
        toast.warn("Invalid Object, must be a proper JSON format!");
      }
    } else {
      input.focus();

      toast.warn("Paste an Object first!");
    }
  };

  return (
    <div className="markdown-container py-5">
      <MDBCol md={10} className="offset-md-1">
        <MDBCard>
          <MDBCardHeader>Object to Markdown Converter 1.0</MDBCardHeader>
          <MDBCardBody>
            <MDBTypography>Paste JSON</MDBTypography>
            <MDBTextArea
              id="text-obj"
              onChange={e => setText(e.target.value)}
            />
          </MDBCardBody>
          <MDBCardFooter>
            <MDBBtn onClick={handleGenerate}>show Markdown</MDBBtn>
            <MDBTypography className="mb-0 mt-2">
              <i>
                Usage may differ depending on data, this is based on a set of
                response and may not cover all kinds of response yet.
              </i>
            </MDBTypography>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MarkdownModal
        datas={datas}
        setDatas={setDatas}
        modal={modal}
        setModal={setModal}
      />
    </div>
  );
};

export default Initial;
