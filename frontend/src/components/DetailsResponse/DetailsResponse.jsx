import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function DetailsResponse({ responseDetail, close }) {
  const getColor = (color) => {
    if (color === 'yellow')
      return '#ffc107';
    else if (color === 'red')
      return '#dc3545';
    else if (color === 'green')
      return '#28a745';
  }
  
  return (
    <div className="container w-100">
      <Table
        striped
        bordered
        hover
        className="rounded"
      >
        <thead>
          <tr>
            <th className="text-center bg-dark text-light">#</th>
            <th className="text-center bg-dark text-light"> Name</th>
            <th className="text-center bg-dark text-light">Address</th>
            <th className="text-center bg-dark text-light">Count</th>
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
            <tr  key={index}>
              <td style={{ backgroundColor: getColor(detail.data.color) }}>{index + 1}</td>
              <td style={{ backgroundColor: getColor(detail.data.color) }}>{detail.data.name}</td>
              <td style={{ backgroundColor: getColor(detail.data.color) }}>{detail.data.address}</td>
              <td style={{ backgroundColor: getColor(detail.data.color) }}>{detail.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
     <div className="d-flex justify-content-center">
     {
        close && (
          <Button variant="warning" onClick={() => close(false)}>
            Back
          </Button>
        )
      }
     </div>
    </div>
  );
}

export default DetailsResponse;
