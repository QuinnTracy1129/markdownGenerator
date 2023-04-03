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

export default function MarkdownModal({
  datas,
  setDatas,
  modal,
  setModal,
  text,
}) {
  const [isResponse, setIsReponse] = useState(true),
    [activeHover, setActiveHover] = useState("");

  const handleFormat = () => {
    let table = `#### ${
      isResponse ? "Response Body" : "Request Query"
    } Parameters\n\n| Parameter | ${
      !isResponse ? "Mandatory/Optional | " : ""
    }Datatype | Min | Max | Description |\n| :- | ${
      !isResponse ? ":-: | " : ""
    }:-: | :-: | :-: | :- |\n`;

    for (let index = 0; index < datas.length; index++) {
      const data = datas[index];

      let _type = "`" + data.type + "`";

      table += `| **${data.parameter}**${
        !isResponse ? ` | ${data.mandatory}` : ""
      } | ${_type} | ${data.min || "-"} | ${data.max || "-"} | ${
        data.description
      } |\n`;
    }

    table += `\n\n#### Sample ${
      isResponse ? "Response" : "Request"
    }\n\n~~~json\n${text}\n~~~`;

    navigator.clipboard.writeText(table);
    toast.success("Markdown Copied to Clipboard.");
    toast.info("Remember to double check the markdown after pasting it.");
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
          <MDBModalBody>
            <MDBTable
              bordered
              className="text-center caption-top"
              small
              align="middle"
              hover
            >
              <caption className="pt-0 pb-1 text-dark">
                You can click on&nbsp;
                <code
                  className="cursor-pointer"
                  onMouseOver={() => setActiveHover("type")}
                  onMouseOut={() => setActiveHover("")}
                >
                  Datatype
                </code>
                ,&nbsp;
                <code
                  className="cursor-pointer"
                  onMouseOver={() => setActiveHover("min")}
                  onMouseOut={() => setActiveHover("")}
                >
                  Min Length
                </code>
                &nbsp;and&nbsp;
                <code
                  className="cursor-pointer"
                  onMouseOver={() => setActiveHover("max")}
                  onMouseOut={() => setActiveHover("")}
                >
                  Max Length
                </code>
                &nbsp;values to update them.
              </caption>
              <MDBTableHead>
                <tr>
                  <th className="text-start">
                    <b>Parameter</b>
                  </th>
                  {!isResponse && (
                    <th>
                      <b>Mandatory/Optional</b>
                    </th>
                  )}
                  <th className={`${activeHover === "type" && "table-active"}`}>
                    <b>Datatype</b>
                  </th>
                  <th className={`${activeHover === "min" && "table-active"}`}>
                    <b>Min Length</b>
                  </th>
                  <th className={`${activeHover === "max" && "table-active"}`}>
                    <b>Max Length</b>
                  </th>
                  <th className="text-start">
                    <b>Description</b>
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {datas.map((data, index) => (
                  <ModalCard
                    key={`${data.parameter}-${index}-${data.type}`}
                    isResponse={isResponse}
                    data={data}
                    index={index}
                    datas={datas}
                    setDatas={setDatas}
                    activeHover={activeHover}
                  />
                ))}
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
