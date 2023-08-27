import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MedicalDetailsResponse from "../DetailsResponse/MedicalDetailResponse.js";


function MedicineDetailForm({ formTitle, handleSubmit, close2 }) {
  const [detail, setDetail] = useState({
    name: 0,
    count: 0,
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

    if(responseDetail){
        return (
            <MedicalDetailsResponse responseDetail={responseDetail} setResponseDetail={setResponseDetail}/>
        );
    }

  return (
   <div className="container-fluid py-5">
     <div className='container  rounded p-5 shadow' style={{width:"40%", backgroundColor:'#333'}}>
      <h2 className="text-light text-center">{formTitle}</h2>
        
      {!responseDetail && (<Form onSubmit={async (event) => {
          const data = await handleSubmit(event, detail);
          if (data.data)
            setResponseDetail(data.data);
          else
            alert('Something Went Wrong!')
        }}
        >
        <Form.Group className="mb-3" controlId="formRedCount">
          <Form.Label className="text-light">Medicine Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Medicine Name"
            onChange={(e) => setDetail({ ...detail, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formYellowCount">
          <Form.Label className="text-light">Count</Form.Label>
          <Form.Control
            type="text"
            placeholder="Count of medicine"
            onChange={(e) =>
              setDetail({ ...detail, count: e.target.value })
            }
          />
        </Form.Group>
            
        <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Button onClick={()=>close2(false)} variant="warning">
                back
            </Button>
        </div>
      </Form>)}
      {/* {responseDetail && } */}
    </div>
   </div>
  );
}

export default MedicineDetailForm;