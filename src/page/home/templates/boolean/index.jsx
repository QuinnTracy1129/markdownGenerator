import React, { useState } from "react";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBSwitch,
  MDBTypography,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";

export default function HandleBoolean({
  isResponse,
  data,
  index,
  datas,
  setDatas,
}) {
  const [str, setStr] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const newArr = [...datas];
    newArr[index].description = str;
    setDatas(newArr);
  };

  return (
    <div key={`${data.parameter}-${index}`} className="mb-3">
      <MDBTypography className="mb-0">{data.parameter}</MDBTypography>
      <MDBTable responsive className="text-center">
        <MDBTableHead>
          <tr>
            <th>Parameter</th>
            {!isResponse && <th>Mandatory/Optional</th>}
            <th>Datatype</th>
            <th>Description</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>{data.parameter}</td>
            {!isResponse && (
              <td>
                <MDBSwitch
                  onChange={() => {
                    const newArr = [...datas];
                    newArr[index].mandatory = !data.mandatory;
                    setDatas(newArr);
                  }}
                  checked={data.mandatory}
                />
              </td>
            )}
            <td>{data.type}</td>
            <td>
              <form onSubmit={handleSubmit}>
                <MDBInputGroup className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Description"
                    value={str || data.description}
                    onChange={e => setStr(e.target.value)}
                  />
                  {str !== data.description && (
                    <MDBBtn type="submit" outline>
                      <MDBIcon icon="pen" />
                    </MDBBtn>
                  )}
                </MDBInputGroup>
              </form>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
