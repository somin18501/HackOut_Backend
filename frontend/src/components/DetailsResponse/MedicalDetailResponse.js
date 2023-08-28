import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function MedicalDetailsResponse({ responseDetail, setResponseDetail }) {
  // console.log("here ", responseDetail);
  return (
    <div className="container-fluid py-5">
      <div className="container shadow" style={{ width: '60%' }}>
        <Table
          striped
          bordered
          hover
          className="mb-3 shadow"
        >
          <thead>
            <tr>
              <th className="text-center bg-dark text-light">#</th>
              <th className="text-center bg-dark text-light">Medical Store Name</th>
              <th className="text-center bg-dark text-light">Medical Store Address</th>
              <th className="text-center bg-dark text-light">Quantity Available</th>
            </tr>
          </thead>
          <tbody>
            {responseDetail.length === 0 && (
              <tr >
                <td colSpan="4" className="text-center">
                  No Data
                </td>
              </tr>
            )}
            {responseDetail.length && responseDetail.map((detail, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{detail.medical.name}</td>
                <td>{detail.medical.address}</td>
                <td>{detail.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center my-5">
          <Button variant="warning" onClick={() => setResponseDetail(null)}>
            back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MedicalDetailsResponse;
