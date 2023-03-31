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
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import ModalCard from "./card";

export default function MarkdownModal({ datas, setDatas, modal, setModal }) {
  const [isResponse, setIsReponse] = useState(true);

  const handleFormat = () => {
    console.log(datas);
    let table = "";

    datas.map(data => {
      let _parameter = data.parameter,
        _type = "`" + data.type + "`";

      switch (data.type) {
        case "array":
        case "object":
          data.children.map(child => {
            let _childParameter = child.parameter;

            if (child.type.includes("array")) {
              _childParameter += "[]";
            }

            table += `| **${_parameter}.${_childParameter}**${
              !isResponse
                ? ` | ${child.mandatory ? "Mandatory" : "Optional"}`
                : ""
            } | ${_type} | - | - | ${child.description} |\n`;

            return true;
          });
          break;

        default:
          if (data.type.includes("<")) {
            _parameter += "[]";
          }

          table += `| **${_parameter}**${
            !isResponse
              ? ` | ${data.mandatory ? "Mandatory" : "Optional"} `
              : ""
          } | ${_type} | - | - | ${data.description} |\n`;
          break;
      }

      return true;
    });

    navigator.clipboard.writeText(table);
    toast.success("Markdown Copied to Clipboard.");
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
            <MDBTable className="text-center" small>
              <MDBTableHead>
                <tr>
                  <th>Parameter</th>
                  {!isResponse && <th>Mandatory/Optional</th>}
                  <th>Datatype</th>
                  <th>Min Length</th>
                  <th>Max Length</th>
                  <th>Description</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {datas.map((data, index) => {
                  switch (data.type) {
                    case "array":
                    case "object":
                      return data.children.map((child, cIndex) => (
                        <ModalCard
                          key={`${data.parameter}-${index}-${data.type}-${child.parameter}-${cIndex}-${child.type}`}
                          isResponse={isResponse}
                          parameter={data.parameter}
                          data={child}
                          index={index}
                          cIndex={cIndex}
                          datas={datas}
                          setDatas={setDatas}
                        />
                      ));

                    default:
                      return (
                        <ModalCard
                          key={`${data.parameter}-${index}-${data.type}`}
                          isResponse={isResponse}
                          data={data}
                          index={index}
                          datas={datas}
                          setDatas={setDatas}
                        />
                      );
                  }
                })}
              </MDBTableBody>
            </MDBTable>
          </MDBModalBody>

          <MDBModalFooter className="d-flex justify-content-between">
            <MDBBtnGroup>
              <MDBBtn
                outline={isResponse === true}
                onClick={() => setIsReponse(true)}
                color="secondary"
              >
                response
              </MDBBtn>
              <MDBBtn
                outline={isResponse === false}
                onClick={() => setIsReponse(false)}
              >
                request
              </MDBBtn>
            </MDBBtnGroup>
            <MDBBtn color="success" onClick={handleFormat}>
              copy to clipboard
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
