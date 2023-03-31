import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../../components/table";
import Pager from "../../../../../components/pager";
import Search from "../../../../../components/search";
import Swal from "sweetalert2";
import {
  PENDING,
  DESTROY,
  UPDATE,
  PATH,
} from "../../../../../redux/slices/persons/users";
import { fullMobile, fullName } from "../../../../../components/utilities";
import Company from "../../../../../fakeDb/company";
import { toast } from "react-toastify";

const paths = [
  {
    name: "Unresolved Users",
  },
];

export default function UsersUnresolved() {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth),
    { unresolved, isLoading } = useSelector(({ users }) => users),
    [users, setUsers] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [inputOptions, setInputOptions] = useState({}),
    dispatch = useDispatch();

  useEffect(() => {
    var newObj = {};
    Company.employees?.map(role => (newObj[role] = role));
    setInputOptions(newObj);
  }, [Company]);

  useEffect(() => {
    dispatch(PENDING(token));
  }, [token]);

  useEffect(() => {
    if (users.length > 0) {
      let totalPages = Math.floor(users.length / maxPage);
      if (users.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      if (page > totalPages) {
        setPage(totalPages);
      }
    }
  }, [users, page, maxPage]);

  useEffect(() => {
    setUsers(unresolved);
  }, [unresolved]);

  const handleSearch = e => {
    const key = e.target.value;

    if (key) {
      setUsers(
        unresolved.filter(catalog =>
          fullName(catalog.fullName).includes(key.toUpperCase())
        )
      );
    } else {
      setUsers(unresolved);
    }
  };

  const handleAppoint = async data => {
    const { value: _role } = await Swal.fire({
      title: "Choose a role",
      input: "select",
      inputValue: data.role,
      inputOptions,
    });

    if (_role) {
      if (_role !== data.role) {
        dispatch(PATH("unresolved"));
        dispatch(
          UPDATE({
            id: data._id,
            data: { role: _role },
            token,
          })
        );
      } else {
        toast.warn("No changes found!");
      }
    }
  };

  const handleArchive = data =>
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      html: `You are about to archive ${data.fullName?.fname}.`,
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(PATH("unresolved"));
        dispatch(DESTROY({ id: data._id, token }));
      }
    });

  return (
    <>
      <BreadCrumb
        title="Pending Users"
        button
        paths={paths}
        tooltip="Create new user"
        handler={() => window.open("/register", "_blank", "noreferrer")}
      />

      <MDBContainer fluid className="pt-5 mt-5">
        <MDBCard background={theme.color} className={`${theme.text} mb-2`}>
          <MDBCardBody>
            <MDBRow>
              <Search label="Search by Fullname" handler={handleSearch} />
              <Pager total={totalPages} page={page} setPage={setPage} />
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        <MDBCard background={theme.color} className={`${theme.text}`}>
          <MDBCardBody>
            <DataTable
              name="Users"
              datas={users}
              titles={[
                "Credentials",
                {
                  _title: "Mobile",
                  _styles: "text-center",
                },
                {
                  _title: "Actions",
                  _styles: "text-center",
                },
              ]}
              contents={[
                {
                  _keys: ["fullName", "email"],
                  _format: [data => fullName(data)],
                },
                {
                  _keys: "mobile",
                  _styles: "text-center",
                  _format: data => fullMobile(data),
                },
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
              handlers={[handleAppoint, handleArchive]}
              actions={[
                {
                  _title: "Appoint",
                  _icon: "user-cog",
                  _color: "secondary",
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
              empty="Users are empty"
            />
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
