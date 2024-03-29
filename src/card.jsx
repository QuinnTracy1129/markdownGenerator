import React from "react";
import { MDBSwitch, MDBInput } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function ModalCard({
  isResponse,
  data,
  index,
  datas,
  setDatas,
  activeHover,
}) {
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
      html: `<h4 class='mb-0'>Update <code>${data.parameter}</code> ${action}</h4>`,
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

      newArr[index][key] = str;

      setDatas(newArr);
      toast.success(`<${data.parameter}> ${action} Updated Successfully!`);
      setTimeout(() => document.getElementById(`desc-${index}`).focus(), 500);
    }
  };

  return (
    <tr>
      <td className="text-start">{data.parameter}</td>
      {!isResponse && (
        <td>
          <MDBSwitch
            onChange={() => {
              const newArr = [...datas];

              newArr[index].mandatory =
                data.mandatory === "Mandatory" ? "Optional" : "Mandatory";

              setDatas(newArr);
            }}
            checked={data.mandatory === "Mandatory"}
          />
        </td>
      )}
      <td className={`${activeHover === "datatype" && "table-active"}`}>
        <code
          onClick={() => handleClicks("datatype")}
          className="cursor-pointer"
        >
          {data.datatype}
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
        <MDBInput
          id={`desc-${index}`}
          value={data.description}
          onChange={e => {
            const newArr = [...datas];
            newArr[index].description = e.target.value;
            setDatas(newArr);
          }}
          onKeyDown={e => {
            if (e.ctrlKey && e.key === ",") {
              e.preventDefault();
              handleClicks("datatype");
            }

            if (e.ctrlKey && e.key === ".") {
              e.preventDefault();
              handleClicks("min");
            }

            if (e.ctrlKey && e.key === "/") {
              e.preventDefault();
              handleClicks("max");
            }

            if (e.ctrlKey && e.key === "Enter") {
              e.preventDefault();
              if (index < datas.length - 1) {
                document.getElementById(`desc-${index + 1}`).focus();
              }
            }

            if (e.ctrlKey && e.key === "\\") {
              e.preventDefault();
              if (index > 0) {
                document.getElementById(`desc-${index - 1}`).focus();
              }
            }
          }}
        />
      </td>
    </tr>
  );
}
