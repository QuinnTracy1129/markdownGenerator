import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../../components/table";
import Pager from "../../../../../components/pager";
import Search from "../../../../../components/search";
import Swal from "sweetalert2";
import {
  RESTORE,
  ARCHIVE,
  APPROVERESTORE,
} from "../../../../../redux/slices/persons/rubrics";

const paths = [
  {
    name: "Archived Rubrics",
  },
];

export default function RubricsArchive() {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth),
    { archives, isLoading } = useSelector(({ rubrics }) => rubrics),
    [rubrics, setRubrics] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(ARCHIVE(token));
  }, [token]);

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
    setRubrics(archives);
  }, [archives]);

  const handleSearch = e => {
    const key = e.target.value;

    if (key) {
      setRubrics(
        archives.filter(catalog => catalog.name.includes(key.toUpperCase()))
      );
    } else {
      setRubrics(archives);
    }
  };

  const handleApprove = data =>
    Swal.fire({
      icon: "question",
      title: "Do you want to approve and restore this?",
      html: "A restored item will be accessible and ready for use.",
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(
          APPROVERESTORE({
            id: data._id,
            token,
          })
        );
      }
    });

  const handleRestore = data =>
    Swal.fire({
      icon: "question",
      title: "Do you want to restore this?",
      html: "A restored item will be accessible.",
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(RESTORE({ id: data._id, token }));
      }
    });

  return (
    <>
      <BreadCrumb title="Rubrics History" paths={paths} />

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
                  _title: "Date",
                  _styles: "text-center",
                },
                {
                  _title: "Actions",
                  _styles: "text-center",
                },
              ]}
              contents={[
                "name",
                {
                  _keys: "deletedAt",
                  // _format: data => new Date(data).toDateString(),
                  _styles: "text-center",
                },
                // {
                //   _keys: ["createdAt", "updatedAt"],
                //   _format: [
                //     data => new Date(data).toDateString(),
                //     data => new Date(data).toDateString(),
                //   ],
                // },
              ]}
              handlers={[handleApprove, handleRestore]}
              actions={[
                {
                  _title: "Approve and Restore",
                  _icon: "check-double",
                  _color: "info",
                  _placement: "left",
                  _function: 0,
                  _condition: data => !data.approved,
                },
                {
                  _title: "Restore",
                  _icon: "folder-open",
                  _color: "success",
                  _placement: "right",
                  _function: 1,
                },
              ]}
              isLoading={isLoading}
              page={page}
              empty="Rubrics archive is empty"
            />
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
