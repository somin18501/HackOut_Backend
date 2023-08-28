import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addHospitals } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AddHospital() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [add, setAdd] = useState('');
    const [pass, setPass] = useState('');
    const [patient, setPatient] = useState('');
    const [doctor, setDoctor] = useState('');
    const [nurse, setNurse] = useState('');
    const [log, setLog] = useState('');
    const [lat, setLat] = useState('');
    const [cap, setCap] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            address: add,
            loginId: name,
            password: pass,
            count: {
                patient,
                doctor,
                nurse,
            },
            coordinate: {
                longitude: log,
                latitude: lat,
            },
            capacity: cap,
        }
        // console.log(data);
        const resp = await addHospitals(data);
        // console.log(resp.data);
        if (resp.data) navigate('/')
        else alert(resp.error);
    }

    return (
        <div className="container-fluid py-5 ">
            <div style={{ backgroundColor: "#333", width: "40%" }} className="container py-5 px-5 rounded shadow-lg">
                <h2 className="text-center text-light">Add Hospital</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Hospital Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Hospital Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Address</Form.Label>
                        <Form.Control type="text" value={add} onChange={(e) => setAdd(e.target.value)} placeholder="Hospital Address" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Password</Form.Label>
                        <Form.Control type="text" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Set Strong Enough Password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">No. of Active Patients</Form.Label>
                        <Form.Control type="number" value={patient} onChange={(e) => setPatient(e.target.value)} placeholder="Add count of active patients' admited at hospitals" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">No. of Active Doctors</Form.Label>
                        <Form.Control type="number" value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Add count of active doctors' posted at hospital" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">No. of Active Nurse</Form.Label>
                        <Form.Control type="number" value={nurse} onChange={(e) => setNurse(e.target.value)} placeholder="Add count of active nurses' posted at hospital" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Bed capacity</Form.Label>
                        <Form.Control type="number" value={cap} onChange={(e) => setCap(e.target.value)} placeholder="Add number of total beds accomodable at hospital" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Latitude</Form.Label>
                        <Form.Control type="number" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Add latitude of the location of hospital" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Longitude</Form.Label>
                        <Form.Control type="number" value={log} onChange={(e) => setLog(e.target.value)} placeholder="Add longitude of the location of hospital" />
                    </Form.Group>
                    <div className='d-flex justify-content-center mt-5'>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                </Form>
            </div>
        </div>
    );
}