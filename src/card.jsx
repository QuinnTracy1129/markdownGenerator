import React, { useState } from "react";
import { MDBBtn, MDBSwitch, MDBIcon, MDBInputGroup } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function ModalCard({
  isResponse,
  data,
  index,
  datas,
  setDatas,
  parameter,
  cIndex,
  activeHover,
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
    let _parameter = data.parameter;

    if (data.type.includes("array")) {
      _parameter += "[]";
    }

    if (parameter) {
      let _param = parameter;

      if (parameter.includes("array")) {
        _param += "[]";
      }

      _parameter = `${_param}.${_parameter}`;
    }

    return _parameter;
  };

  const handleClicks = async key => {
    let action = "",
      input = "";

    switch (key) {
      case "min":
        action = "Min Length";
        input = "number";
        break;

      case "max":
        action = "Max Length";
        input = "number";
        break;

      default:
        action = "Datatype";
        input = "text";
        break;
    }

    const { value: str } = await Swal.fire({
      title: `Update ${data.parameter} ${action}`,
      input,
      inputValue: data[key],
      showCancelButton: true,
      inputValidator: value => {
        switch (key) {
          case "min":
            if (Number(value) < 1) {
              return "Cannot set minimum less than 1!";
            }

            if (data.max) {
              if (Number(value) > Number(data.max)) {
                return "Minimum cannot be higher than maximum!";
              }
            }
            break;

          case "max":
            if (data.min) {
              if (Number(value) < Number(data.min)) {
                return "Maximum cannot be lower than minimum!";
              }
            }
            break;

          default:
            if (!value) {
              return "You need to write something!";
            }
            break;
        }
      },
    });

    if (str) {
      const newArr = [...datas];

      if (parameter) {
        newArr[index].children[cIndex][key] = str;
      } else {
        newArr[index][key] = str;
      }

      setDatas(newArr);
      toast.success("Updated Successfully!");
    }
  };

  return (
    <tr>
      <td className="text-start">{handleParameter()}</td>
      {!isResponse && (
        <td>
          <MDBSwitch
            onChange={() => {
              const newArr = [...datas];

              if (parameter) {
                newArr[index].children[cIndex].mandatory = !data.mandatory;
              } else {
                newArr[index].mandatory = !data.mandatory;
              }

              setDatas(newArr);
            }}
            checked={data.mandatory}
          />
        </td>
      )}
      <td className={`${activeHover === "type" && "table-active"}`}>
        <code onClick={() => handleClicks("type")} className="cursor-pointer">
          {data.type}
        </code>
      </td>
      <td className={`${activeHover === "min" && "table-active"}`}>
        <span onClick={() => handleClicks("min")} className="cursor-pointer">
          {data.min || "-"}
        </span>
      </td>
      <td className={`${activeHover === "max" && "table-active"}`}>
        <span onClick={() => handleClicks("max")} className="cursor-pointer">
          {data.max || "-"}
        </span>
      </td>
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
