import React, { useState } from "react";
import { MDBBtn, MDBSwitch, MDBIcon, MDBInputGroup } from "mdb-react-ui-kit";

export default function ModalCard({
  isResponse,
  data,
  index,
  datas,
  setDatas,
  parameter,
  cIndex,
}) {
  const [str, setStr] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const newArr = [...datas];

    if (parameter) {
      newArr[index].children[cIndex].description = str;
    } else {
      newArr[index].description = str;
    }

    setDatas(newArr);
  };

  const handleParameter = () => {
    var _parameter = data.parameter;

    if (data.type.includes("<")) {
      _parameter += "[]";
    }

    if (parameter) {
      _parameter = `${parameter}.${_parameter}`;
    }

    return _parameter;
  };

  return (
    <tr>
      <td>{handleParameter()}</td>
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
      <td>-</td>
      <td>-</td>
      <td>
        <form onSubmit={handleSubmit}>
          <MDBInputGroup>
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
  );
}
