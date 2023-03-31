import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBTypography,
} from "mdb-react-ui-kit";
import { PresetUser } from "../../../../components/utilities";

const DashboardMerchants = ({ theme }) => {
  return (
    <MDBCard className="mt-3 bg-transparent">
      <MDBCardHeader className={`${theme.bg} ${theme.text} border-0`}>
        <h5 className="font-weight-bold mb-0">Merchants</h5>
        <small className="d-block text-muted">
          Recent Registered Merchants
        </small>
      </MDBCardHeader>
      <MDBCardBody className={`${theme.bg} ${theme.text} pt-3`}>
        <MDBContainer fluid>
          <MDBTable small className="text-light">
            <MDBTableHead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Stores</th>
                <th scope="col">Registration</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <th scope="row">
                  <MDBRow>
                    <MDBCol size={2}>
                      <img
                        src={PresetUser}
                        className="rounded img-fluid"
                        alt="user"
                      />
                    </MDBCol>
                    <MDBCol className="px-0 d-flex align-items-center">
                      <span>
                        <MDBTypography tag="h5" className="mb-0">
                          QuinnTracy
                        </MDBTypography>
                        <span className="text-muted">
                          quinntracy@sample.com
                        </span>
                      </span>
                    </MDBCol>
                  </MDBRow>
                </th>
                <td>Kwek Kwekan</td>
                <td>Date here</td>
              </tr>
              <tr>
                <th scope="row">
                  <MDBRow>
                    <MDBCol size={2}>
                      <img
                        src={PresetUser}
                        className="rounded img-fluid"
                        alt="user"
                      />
                    </MDBCol>
                    <MDBCol className="px-0 d-flex align-items-center">
                      <span>
                        <MDBTypography tag="h5" className="mb-0">
                          QuinnTracy
                        </MDBTypography>
                        <span className="text-muted">
                          quinntracy@sample.com
                        </span>
                      </span>
                    </MDBCol>
                  </MDBRow>
                </th>
                <td>Kwek Kwekan</td>
                <td>Date here</td>
              </tr>
              <tr>
                <th scope="row">
                  <MDBRow>
                    <MDBCol size={2}>
                      <img
                        src={PresetUser}
                        className="rounded img-fluid"
                        alt="user"
                      />
                    </MDBCol>
                    <MDBCol className="px-0 d-flex align-items-center">
                      <span>
                        <MDBTypography tag="h5" className="mb-0">
                          QuinnTracy
                        </MDBTypography>
                        <span className="text-muted">
                          quinntracy@sample.com
                        </span>
                      </span>
                    </MDBCol>
                  </MDBRow>
                </th>
                <td>Kwek Kwekan</td>
                <td>Date here</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      </MDBCardBody>
    </MDBCard>
  );
};

export default DashboardMerchants;
