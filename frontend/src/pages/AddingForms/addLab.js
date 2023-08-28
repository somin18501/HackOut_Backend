import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { addLaboratory } from "../../services/api";

export default function AddLaboratory() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [add, setAdd] = useState('');
    const [pass, setPass] = useState('');
    const [red, setred] = useState('');
    const [yellow, setyellow] = useState('');
    const [green, setgreen] = useState('');
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
            cntSample: {
                red,
                yellow,
                green,
            },
            coordinate: {
                longitude: log,
                latitude: lat,
            },
            capacity: cap,
        }
        // console.log(data);
        const resp = await addLaboratory(data);
        // console.log(resp.data);
        if (resp.data) navigate('/')
        else alert(resp.error);
    }

    return (
        <div className="container-fluid py-5 ">
            <div style={{ backgroundColor: "#333", width: "40%" }} className="container py-5 px-5 rounded shadow-lg">
                <h2 className="text-center text-light">Add Laboratory</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Laboratory Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Laboratory Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Address</Form.Label>
                        <Form.Control type="text" value={add} onChange={(e) => setAdd(e.target.value)} placeholder="Laboratory Address" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Password</Form.Label>
                        <Form.Control type="text" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Set Strong Enough Password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">No. of Active reds</Form.Label>
                        <Form.Control type="number" value={red} onChange={(e) => setred(e.target.value)} placeholder="Add count of active pending red samples" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">No. of Active yellows</Form.Label>
                        <Form.Control type="number" value={yellow} onChange={(e) => setyellow(e.target.value)} placeholder="Add count of active pending yellow samples" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">No. of Active green</Form.Label>
                        <Form.Control type="number" value={green} onChange={(e) => setgreen(e.target.value)} placeholder="Add count of active pending green samples" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Total Testing Capacity</Form.Label>
                        <Form.Control type="number" value={cap} onChange={(e) => setCap(e.target.value)} placeholder="Add number of total testing capacity at one time" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Latitude</Form.Label>
                        <Form.Control type="number" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Add latitude of the location of laboratory" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-light">Longitude</Form.Label>
                        <Form.Control type="number" value={log} onChange={(e) => setLog(e.target.value)} placeholder="Add longitude of the location of laboratory" />
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