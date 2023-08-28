import React, { useContext, useEffect, useState } from "react";
import { DetailForm } from "../../components";
import { allocateResources, allocateLabs, getMedicalStores } from "../../services/api";
import { UserContext } from "../../UserContext";
import MedicineDetailForm from "../../components/DetailForm/MedicineDetailForm";
import Button from "react-bootstrap/esm/Button";

export default function AllocationPage() {
  const { user } = useContext(UserContext);
  const [redirect1, setRedirect1] = useState(false);
  const [redirect2, setRedirect2] = useState(false);

  useEffect(() => {
    document.title = "Allocation Page";
  }, []);

  if (redirect1) {
    return (
      <DetailForm
        formTitle={"Labs Allocation"}
        handleSubmit={allocateLabs}
        close1={setRedirect1}
      />
    );
  }

  if (redirect2) {
    return (
      <MedicineDetailForm
        formTitle={"Medicine Availability"}
        handleSubmit={getMedicalStores}
        close2={setRedirect2}
      />
    );
  }

  return (
    <>
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        {
          user && user.role === "MO" && (
            <DetailForm
              formTitle={"Report Casuality"}
              handleSubmit={allocateResources}
            />
          )
        }
        {
          user && user.role === "Hospital_O" && (
            <div style={{ height: '200px', width: '300px', backgroundColor:'#333' }} className="shadow d-flex flex-column border border-3 rounded justify-content-around align-items-center">
              <Button variant='info' onClick={() => setRedirect1(true)}>Get Labs</Button>
              <Button variant='info' onClick={() => setRedirect2(true)}>Get Medical Stores</Button>
            </div>
          )
        }
      </div>
    </>
  );
}
