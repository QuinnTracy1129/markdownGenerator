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
import { toast } from "react-toastify";

const HandleBoolean = ({ isResponse, data, index, datas, setDatas }) => {
  const [str, setStr] = useState("");

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
              <MDBInputGroup className="mb-3">
                <input
                  className="form-control"
                  placeholder="Description"
                  value={str || data.description}
                  onChange={e => setStr(e.target.value)}
                />
                {str !== data.description && (
                  <MDBBtn
                    outline
                    onClick={() => {
                      const newArr = [...datas];
                      newArr[index].description = str;
                      setDatas(newArr);
                    }}
                  >
                    <MDBIcon icon="pen" />
                  </MDBBtn>
                )}
              </MDBInputGroup>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

const ObjectCard = ({
  data,
  datas,
  setDatas,
  child,
  cIndex,
  index,
  isResponse,
}) => {
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
        <MDBInputGroup className="mb-3">
          <input
            className="form-control"
            placeholder="Description"
            value={str || data.description}
            onChange={e => setStr(e.target.value)}
          />
          {str !== child.description && (
            <MDBBtn
              outline
              onClick={() => {
                const newArr = [...datas];
                newArr[index].children[cIndex].description = str;
                setDatas(newArr);
              }}
            >
              <MDBIcon icon="pen" />
            </MDBBtn>
          )}
        </MDBInputGroup>
      </td>
    </tr>
  );
};

const HandleObject = ({ isResponse, data, index, datas, setDatas }) => {
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
};

export default function MarkdownModal({ datas, setDatas, modal, setModal }) {
  const [isResponse, setIsReponse] = useState(false);

  const handleFormat = () => {
    console.log(datas);
    let table = "";

    datas.map(data => {
      switch (data.type) {
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
            <MDBModalTitle>Edit your markdown</MDBModalTitle>
          </MDBModalHeader>
          <MDBModalBody className="text-start">
            {datas.map((data, index) => {
              switch (data.type) {
                case "boolean":
                  return (
                    <HandleBoolean
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
