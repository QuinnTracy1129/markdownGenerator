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
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBSwitch,
  MDBTypography,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import ObjectCard from "./card";

export default function HandleObject({
  isResponse,
  data,
  index,
  datas,
  setDatas,
}) {
  return (
    <div key={`${data.parameter}-${index}`} className="mb-3">
      <MDBTypography className="mb-0">{data.parameter}</MDBTypography>
      <MDBTable responsive className="text-center">
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
          {data.children.map((child, cIndex) => (
            <ObjectCard
              key={`${child.parameter}-${index}-${cIndex}`}
              data={data}
              datas={datas}
              setDatas={setDatas}
              child={child}
              cIndex={cIndex}
              index={index}
              isResponse={isResponse}
            />
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
