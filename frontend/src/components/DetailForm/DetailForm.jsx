import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DetailResponse from "../DetailsResponse/DetailsResponse.jsx";


function DetailForm({ formTitle, handleSubmit, close1 }) {
  const [detail, setDetail] = useState({
    redCount: 0,
    yellowCount: 0,
    greenCount: 0,
    longitude: 0,
    latitude: 0,
  });


  const [responseDetail, setResponseDetail] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDetail({...detail, longitude: position.coords.longitude, latitude: position.coords.latitude});
      },
      (error) => {
        alert(error.message);
      }
    );
  }, []);


  return (
   <div className="container-fluid py-5">
     <div className='container rounded p-4' style={{ backgroundColor: "#333", width: "40%" }}>
      <h2 className="text-light text-center">{formTitle}</h2>

      {!responseDetail && (<Form
        onSubmit={async (event) => {

          const data = await handleSubmit(event, detail);
          if (data.data)
            setResponseDetail(data.data);
          else
            alert('Something Went Wrong!')
        }}
      >
        <Form.Group className="mb-3" controlId="formRedCount">
          <Form.Label className="text-light">Red Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Red Count"
            onChange={(e) => setDetail({ ...detail, redCount: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formYellowCount">
          <Form.Label className="text-light">Yellow Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Yellow Count"
            onChange={(e) =>
              setDetail({ ...detail, yellowCount: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGreenCount">
          <Form.Label className="text-light">Green Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Green Count"
            onChange={(e) =>
              setDetail({ ...detail, greenCount: e.target.value })
            }
          />
        </Form.Group>

      

       <div className="d-flex justify-content-between">
       <Button variant="primary" type="submit">
          Submit
        </Button>
        {
          close1 && (
            <Button variant="warning" onClick={()=>close1(false)}>
              Back
            </Button>
          )
        }
       </div>
      </Form>)}

      {responseDetail && <DetailResponse responseDetail={responseDetail} close={close1} />}
    </div>
   </div>
  );
}

export default DetailForm;