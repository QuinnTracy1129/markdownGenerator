import React, { useState } from "react";
import { MDBBtn, MDBSwitch, MDBIcon, MDBInputGroup } from "mdb-react-ui-kit";

export default function ObjectCard({
  data,
  datas,
  setDatas,
  child,
  cIndex,
  index,
  isResponse,
}) {
  const [str, setStr] = useState("");

  const handleParameter = (data, dataType, child, childType) => {
    var _child = child;

    if (childType === "array") {
      _child = `${child}[]`;
    }

    if (dataType === "object") {
      return `${data}.${_child}`;
    } else {
      return `${data}[].${_child}`;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newArr = [...datas];
    newArr[index].children[cIndex].description = str;
    setDatas(newArr);
  };

  return (
    <tr>
      <td>
        {handleParameter(
          data.parameter,
          data.type,
          child.parameter,
          child.type
        )}
      </td>
      {!isResponse && (
        <td>
          <MDBSwitch
            onChange={() => {
              const newArr = [...datas];
              newArr[index].children[cIndex].mandatory = !child.mandatory;
              setDatas(newArr);
            }}
            checked={child.mandatory}
          />
        </td>
      )}
      <td>{child.type}</td>
      <td>-</td>
      <td>-</td>
      <td>
        <form onSubmit={handleSubmit}>
          <MDBInputGroup className="mb-3">
            <input
              className="form-control"
              placeholder="Description"
              value={str || data.description}
              onChange={e => setStr(e.target.value)}
            />
            {str !== child.description && (
              <MDBBtn outline>
                <MDBIcon icon="pen" />
              </MDBBtn>
            )}
          </MDBInputGroup>
        </form>
      </td>
    </tr>
  );
}
