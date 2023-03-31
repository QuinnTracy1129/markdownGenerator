import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import HandleBoolean from "./templates/boolean";
import HandleObject from "./templates/objects";
import HandleString from "./templates/string";

export default function MarkdownModal({ datas, setDatas, modal, setModal }) {
  const [isResponse, setIsReponse] = useState(false);

  const handleFormat = () => {
    let table = "";

    datas.map(data => {
      switch (data.type) {
        case "number":
        case "string":
        case "boolean":
          table += `| **${data.parameter}**${
            !isResponse
              ? ` | ${data.mandatory ? "Mandatory" : "Optional"} `
              : ""
          } | ${data.type} | - | - | ${data.description} |\n`;
          break;

        case "object":
          data.children.map(child => {
            table += `| **${data.parameter}.${child.parameter}**${
              !isResponse
                ? ` | ${child.mandatory ? "Mandatory" : "Optional"} `
                : ""
            } | ${child.type} | - | - | ${child.description} |\n`;
          });
          break;

        case "array":
          data.children.map(child => {
            table += `| **${data.parameter}[].${child.parameter}${
              child.type === "array" ? "[]" : ""
            }**${
              !isResponse
                ? ` | ${child.mandatory ? "Mandatory" : "Optional"} `
                : ""
            } | ${child.type} | - | - | ${child.description} |\n`;
          });
          break;

        default:
          break;
      }
    });

    navigator.clipboard.writeText(table);
    toast.success("Text Copied to Clipboard.");
  };

  return (
    <MDBModal staticBackdrop show={modal} setShow={setModal} tabIndex="-1">
      <MDBModalDialog size="fullscreen">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Configure and Finalize your markdown</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setModal(false)}
            />
          </MDBModalHeader>
          <MDBModalBody className="text-start">
            {datas.map((data, index) => {
              switch (data.type) {
                case "boolean":
                  return (
                    <HandleBoolean
                      key={`${data.parameter}-${index}-boolean`}
                      isResponse={isResponse}
                      data={data}
                      index={index}
                      datas={datas}
                      setDatas={setDatas}
                    />
                  );

                case "number":
                case "string":
                  return (
                    <HandleString
                      key={`${data.parameter}-${index}-${data.type}`}
                      isResponse={isResponse}
                      data={data}
                      index={index}
                      datas={datas}
                      setDatas={setDatas}
                    />
                  );

                case "array":
                case "object":
                  return (
                    <HandleObject
                      key={`${data.parameter}-${index}-${data.type}`}
                      isResponse={isResponse}
                      data={data}
                      index={index}
                      datas={datas}
                      setDatas={setDatas}
                    />
                  );

                default:
                  return `${data.type} is not yet listed :(`;
              }
            })}
          </MDBModalBody>

          <MDBModalFooter className="d-flex justify-content-between">
            <MDBBtnGroup>
              <MDBBtn
                outline={isResponse === false}
                onClick={() => setIsReponse(false)}
              >
                request
              </MDBBtn>
              <MDBBtn
                outline={isResponse === true}
                onClick={() => setIsReponse(true)}
                color="secondary"
              >
                response
              </MDBBtn>
            </MDBBtnGroup>
            <MDBBtn
              //   onClick={() => {
              //     console.log(datas);
              //   }}
              onClick={handleFormat}
            >
              copy to clipboard
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
