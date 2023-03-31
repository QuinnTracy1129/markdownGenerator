import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBSwitch,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET, UPDATE } from "../../../redux/slices/persons/auth";

export default function BasicForm({ visibility, setVisibility, auth }) {
  const { theme, token, isSuccess } = useSelector(({ auth }) => auth),
    [form, setForm] = useState({
      fullName: {
        fname: "",
        mname: "",
        lname: "",
        suffix: "",
      },
      isMale: false,
      address: {
        street: "",
        barangay: "",
        city: "",
        region: "",
        province: "",
      },
      bio: "",
    }),
    { catalogs } = useSelector(({ rubrics }) => rubrics),
    dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setVisibility(false);
      dispatch(RESET());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (auth._id) {
      setForm(auth);
    }
  }, [auth]);

  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = e => {
    e.preventDefault();

    if (JSON.stringify(auth) !== JSON.stringify(form)) {
      const user = {
        _id: form._id,
        form: {
          fullName: {
            fname: form.fullName?.fname,
            mname: form.fullName?.mname?._id,
            lname: form.fullName?.lname?._id,
            suffix: form.fullName?.suffix,
          },
          isMale: form.isMale,
          address: form.address,
          bio: form.bio,
        },
      };
      dispatch(UPDATE({ user, token }));
    } else {
      toast.warn("No changes found!");
    }
  };

  const handleChange = (type, name, value) => {
    var newObj = { ...form[type] };

    if (type === "fullName") {
      if (name === "fname" || name === "suffix") {
        newObj[name] = value.toUpperCase();
      } else {
        newObj[name] = catalogs.find(catalog => catalog._id === value);
      }
    } else {
      newObj[name] = value.toUpperCase();
    }

    setForm({
      ...form,
      [type]: newObj,
    });
  };

  return (
    <MDBModal
      show={visibility}
      staticBackdrop
      setShow={setVisibility}
      tabIndex="-1"
    >
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Update Basic Information</MDBModalTitle>
          </MDBModalHeader>
          <form onSubmit={handleSubmit}>
            <MDBModalBody>
              <MDBRow>
                <MDBCol size={4}>
                  <MDBInput
                    label="First name"
                    value={form.fullName?.fname}
                    onChange={e =>
                      handleChange("fullName", "fname", e.target.value)
                    }
                    contrast={theme.dark}
                    required
                  />
                </MDBCol>
                <MDBCol size={4}>
                  <select
                    value={form?.fullName?.mname?._id}
                    className={`form-control ${theme.bg} ${theme.text}`}
                    onChange={e =>
                      handleChange("fullName", "mname", e.target.value)
                    }
                  >
                    <option value="">Middle name</option>
                    {catalogs?.map((catalog, index) => (
                      <option key={`mname-${index}`} value={catalog._id}>
                        {catalog.name}
                      </option>
                    ))}
                  </select>
                </MDBCol>
                <MDBCol size={4}>
                  <select
                    value={form?.fullName?.lname?._id}
                    className={`form-control ${theme.bg} ${theme.text}`}
                    onChange={e =>
                      handleChange("fullName", "lname", e.target.value)
                    }
                    required
                  >
                    <option value="">Last name</option>
                    {catalogs?.map((catalog, index) => (
                      <option key={`lname-${index}`} value={catalog._id}>
                        {catalog.name}
                      </option>
                    ))}
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol size={9}>
                  <MDBInput
                    label="Suffix / Name Extension"
                    value={form.fullName?.suffix}
                    onChange={e =>
                      handleChange("fullName", "suffix", e.target.value)
                    }
                    contrast={theme.dark}
                  />
                </MDBCol>
                <MDBCol size={3} className="d-flex align-items-center">
                  <MDBSwitch
                    onChange={() =>
                      setForm({
                        ...form,
                        isMale: !form.isMale,
                      })
                    }
                    id="isMale"
                    label={form.isMale ? "Male" : "Female"}
                    checked={form.isMale}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol size={6}>
                  <MDBInput
                    label="Street"
                    value={form.address?.street}
                    onChange={e =>
                      handleChange("address", "street", e.target.value)
                    }
                    contrast={theme.dark}
                  />
                </MDBCol>
                <MDBCol size={6}>
                  <MDBInput
                    label="Barangay"
                    value={form.address?.barangay}
                    onChange={e =>
                      handleChange("address", "barangay", e.target.value)
                    }
                    contrast={theme.dark}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol size={4}>
                  <MDBInput
                    label="City"
                    value={form.address?.city}
                    onChange={e =>
                      handleChange("address", "city", e.target.value)
                    }
                    contrast={theme.dark}
                  />
                </MDBCol>
                <MDBCol size={4}>
                  <MDBInput
                    label="Region"
                    value={form.address?.region}
                    onChange={e =>
                      handleChange("address", "region", e.target.value)
                    }
                    contrast={theme.dark}
                  />
                </MDBCol>
                <MDBCol size={4}>
                  <MDBInput
                    label="Province"
                    value={form.address?.province}
                    onChange={e =>
                      handleChange("address", "province", e.target.value)
                    }
                    contrast={theme.dark}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size={12}>
                  <MDBTextArea
                    rows={3}
                    value={form.bio}
                    onChange={e => setForm({ ...form, bio: e.target.value })}
                    label="Biography"
                    contrast={theme.dark}
                  />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                type="button"
                color={theme.color}
                className="shadow-0"
                onClick={toggleShow}
              >
                Close
              </MDBBtn>
              <MDBBtn color="success">Save changes</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
