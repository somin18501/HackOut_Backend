import React, { useContext, useEffect, useState } from "react";
import { Graphs } from "../../components";
import { getNearestHospitals } from "../../services/api";
import Table from "react-bootstrap/Table";
import Carousel from "react-bootstrap/Carousel";
import { UserContext } from "../../UserContext";



export default function HomePage() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [hospitals, setHospitals] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = "Home Page";

    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }
    );
  }, []);
  
  return (
    <>
      <div className="container py-3 d-flex justify-content-center align-items-center flex-column" >
        <div className="container p-0 d-flex justify-content-between align-items-center">
          <div style={{ height: '300px', width: '300px' }} className="border border-3 rounded-circle d-flex justify-content-center align-items-center">
            <img src="./assets/img5.png" alt="doctor" style={{ height: '250px', width: '250px' }} />
          </div>
          <Carousel className="m-3 shadow rounded" variant="dark" interval={5000}>
            <Carousel.Item>
              <img
                style={{ height: '350px' }}
                src="./assets/img1.jpeg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Goverment Schemes</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ height: '350px' }}
                src="./assets/img2.jpeg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Aayushmaan Bharat Yojana</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ height: '350px' }}
                src="./assets/img3.jpeg"
                alt="Thirm slide"
              />
              <Carousel.Caption>
                <h3>PM Jay Yojana</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <div style={{ height: '300px', width: '300px' }} className="bg-secondary rounded-circle shadow">
            <img src="./assets/img4.png" alt="doctor" style={{ height: '300px', width: '300px' }} />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column my-5" style={{ width: '60%' }}>
          {
            !user && (
              <button className="btn btn-primary" onClick={async (event) => {
                setHospitals([])
                setHospitals(await getNearestHospitals(event, { latitude, longitude }))
                // console.log(hospitals)
              }}>Get Nearest Hopitals</button>
            )
          }

          {hospitals && hospitals.length === 0 && (<div className="spinner-border text-primary m-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>)}

          {hospitals && hospitals.length > 0 && (
            <>
              <h2 className="h2 my-3">Nearest 5 Hospitals from your locations are:</h2>
              <Table
                striped
                bordered
                hover
                className="m-3 shadow" >
                <thead>
                  <tr>
                    <th className="text-center bg-dark text-light">#</th>
                    <th className="text-center bg-dark text-light">Hospital Name</th>
                    <th className="text-center bg-dark text-light">Address</th>
                    <th className="text-center bg-dark text-light">Bed counts</th>
                    <th className="text-center bg-dark text-light">Distance (Kms)</th>
                    <th className="text-center bg-dark text-light">Duration (Mins)</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((hospital, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{hospital.hospital.name}</td>
                      <td className="text-center">{hospital.hospital.address}</td>
                      <td className="text-center">{hospital.hospital.capacity}</td>
                      <td className="text-center">{Math.ceil(hospital.distance / 1000)}</td>
                      <td className="text-center">{Math.ceil(hospital.duration / 60)}</td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            </>
          )}

        </div>
        {
          user && user.role === "Admin" && (
            <Graphs />
          ) 
        }
      </div >
    </>
  );
}
