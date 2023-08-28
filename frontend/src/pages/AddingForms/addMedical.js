import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addMedicalCenter } from '../../services/api'
import { useNavigate } from 'react-router-dom';

export default function AddMedicalStore() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Add Medical Store";
    }, []);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [medicines, setMedicines] = useState([{ id: '1', name: '', count: '' }]);


    const addMedicine = () => {
        console.log(medicines)
        setMedicines([...medicines, { id: Date.now().toString(), name: '', count: '' }]);
    };

    const removeMedicine = (id) => {
        const updatedMedicines = medicines.filter(medicine => medicine.id !== id);
        setMedicines(updatedMedicines);
    };

    const handleMedicineChange = (id, field, value) => {
        const updatedMedicines = medicines.map(medicine => {
            if (medicine.id === id) {
                return { ...medicine, [field]: value };
            }
            return medicine;
        });
        setMedicines(updatedMedicines);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            address,
            loginId,
            password,
            medicine: medicines,
            coordinate: {
                longitude,
                latitude
            }
        };

        const response = await addMedicalCenter(data);
        if (response.data)
            navigate('/');
        else
            alert('Error while adding Medical Store');
    };

    return (
        <>
            <div className="container-fluid py-5 ">
                <div className="container p-5 rounded shadow" style={{ backgroundColor: '#333', width: '40%' }}>
                    <h2 className="text-center text-white">Add Medical Store</h2>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group contolId="name" className='mb-3'>
                            <Form.Label className="text-white">Medicine Store Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Medicine Store name" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group contolId="address" className='mb-3'>
                            <Form.Label className="text-white">Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>

                        <Form.Group contolId="loginId" className='mb-3'>
                            <Form.Label className="text-white">Login ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter Login ID" onChange={(e) => setLoginId(e.target.value)} />
                        </Form.Group>

                        <Form.Group contolId="password" className='mb-3'>
                            <Form.Label className="text-white">Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <div>
                            {medicines.map((medicine, index) => (
                                <div className='bg-secondary p-3 rounded my-3' key={medicine.id}>
                                    <Form.Group contolId={`medicineId ${index}`} className='mb-3'>
                                        <Form.Label className="text-white">Medicine ID</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Medicine ID" onChange={(e) => handleMedicineChange(medicine.id, 'id', e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group contolId={`medicineName ${index}`} className='mb-3'>
                                        <Form.Label className="text-white">Medicine Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Medicine Name" onChange={(e) => handleMedicineChange(medicine.id, 'name', e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group contolId={`medicineCount ${index}`} className='mb-3'>
                                        <Form.Label className="text-white">Medicine Count</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Medicine Count" onChange={(e) => handleMedicineChange(medicine.id, 'count', e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button variant="danger" onClick={() => removeMedicine(medicine.id)}>Remove</Button>

                                </div>)
                            )}
                        </div>

                        <Button variant="primary" className='my-3' onClick={addMedicine}>Add Medicine</Button>

                        <Form.Group contolId="longitude" className='mb-3'>
                            <Form.Label className="text-white">Longitude</Form.Label>
                            <Form.Control type="text" placeholder="Enter Longitude" onChange={(e) => setLongitude(e.target.value)} />
                        </Form.Group>

                        <Form.Group contolId="latitude" className='mb-3'>
                            <Form.Label className="text-white">Latitude</Form.Label>
                            <Form.Control type="text" placeholder="Enter Latitude" onChange={(e) => setLatitude(e.target.value)} />
                        </Form.Group>

                        <div className='d-flex justify-content-center mt-5'>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}