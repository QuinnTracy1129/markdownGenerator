import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../../components/table";
import Pager from "../../../../../components/pager";
import Search from "../../../../../components/search";
import Swal from "sweetalert2";
import {
  DESTROY,
  SAVE,
  RESET,
  UPDATE,
} from "../../../../../redux/slices/persons/rubrics";
import Modal from "../../../../../components/modal";
import { toast } from "react-toastify";

const paths = [
  {
    name: "Registered Rubrics",
  },
];

const preset = { name: "" };

export default function RubricsList() {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth),
    { catalogs, isLoading, isSuccess } = useSelector(({ rubrics }) => rubrics),
    [rubrics, setRubrics] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [modal, setModal] = useState({ visibility: false, create: true }),
    [record, setRecord] = useState({
      name: "",
    }),
    dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setModal({ visibility: false, create: true });
      dispatch(RESET());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (rubrics.length > 0) {
      let totalPages = Math.floor(rubrics.length / maxPage);
      if (rubrics.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      if (page > totalPages) {
        setPage(totalPages);
      }
    }
  }, [rubrics, page, maxPage]);

  useEffect(() => {
    setRubrics(catalogs);
  }, [catalogs]);

  const handleSearch = e => {
    const key = e.target.value;

    if (key) {
      setRubrics(
        catalogs.filter(catalog => catalog.name.includes(key.toUpperCase()))
      );
    } else {
      setRubrics(catalogs);
    }
  };

  const handleEdit = data => {
    setRecord(data);
    setModal({ visibility: true, create: false });
  };

  const handleSubmit = res => {
    var _res = { ...res };

    if (modal.create) {
      _res.approved = true;
      dispatch(SAVE({ form: _res }));
    } else {
      if (JSON.stringify(record) !== JSON.stringify(_res)) {
        dispatch(UPDATE({ token, data: _res, id: record._id }));
      } else {
        toast.warn("No changes found!");
      }
    }
  };

  const handleArchive = data =>
    Swal.fire({
      icon: "question",
      title: "Do you want to archive this?",
      html: "An archived item will not be used.",
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(DESTROY({ id: data._id, token }));
      }
    });

  return (
    <>
      <BreadCrumb
        title="Rubrics List"
        button
        paths={paths}
        tooltip="Create new rubric"
        handler={() => setModal({ visibility: true, create: true })}
      />
      <Modal
        title={modal.create ? "Create a rubric" : `Update ${record.name}`}
        submitColor={modal.create ? "success" : "info"}
        submitText={modal.create ? "Submit" : "update"}
        submitHandler={handleSubmit}
        visibility={modal.visibility}
        form={[
          {
            _name: "name",
            _label: "Name",
            _format: val => val.toUpperCase(),
            _required: true,
            _message: "We need a name for this.",
            // _type: "text",
            // _size: 6,
            // _md: 6,
          },
        ]}
        data={modal.create ? preset : record}
        size="md"
        setVisibility={() => setModal({ visibility: false, create: true })}
      />
      <MDBContainer fluid className="pt-5 mt-5">
        <MDBCard background={theme.color} className={`${theme.text} mb-2`}>
          <MDBCardBody>
            <MDBRow>
              <Search label="Search by Name" handler={handleSearch} />
              <Pager total={totalPages} page={page} setPage={setPage} />
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        <MDBCard background={theme.color} className={`${theme.text}`}>
          <MDBCardBody>
            <DataTable
              name="Rubrics"
              datas={rubrics}
              titles={[
                "Name",
                {
                  _title: "Actions",
                  _styles: "text-center",
                },
              ]}
              contents={[
                "name",
                // {
                //   _keys: "createdAt",
                //   _format: data => new Date(data).toDateString(),
                //   _styles: "text-center",
                // },
                // {
                //   _keys: ["createdAt", "updatedAt"],
                //   _format: [
                //     data => new Date(data).toDateString(),
                //     data => new Date(data).toDateString(),
                //   ],
                // },
              ]}
              handlers={[handleEdit, handleArchive]}
              actions={[
                {
                  _title: "Edit",
                  _icon: "pen",
                  _color: "info",
                  _placement: "left",
                  _function: 0,
                },
                {
                  _title: "Archive",
                  _icon: "folder-minus",
                  _color: "warning",
                  _placement: "right",
                  _function: 1,
                },
              ]}
              isLoading={isLoading}
              page={page}
              empty="Rubrics are empty"
            />
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
