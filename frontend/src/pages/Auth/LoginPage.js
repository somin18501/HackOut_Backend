import React, { useState, useEffect, useContext } from "react";

import { Login } from "../../services/api";
import { UserContext } from "../../UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [formInput, setFormInput] = useState({ userName: "", password: "", role: "" });

    useEffect(() => {
        document.title = "Login Page";
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            username: formInput.userName,
            password: formInput.password,
            role: formInput.role
        }
        const { success, token } = await Login(data);
        if(success){
            localStorage.setItem('token', JSON.stringify(token));
            const obj = {
                username: data.username,
                role: data.role
            }
            localStorage.setItem('user', JSON.stringify(obj));
            // console.log(obj);
            setUser(obj);
            // console.log(user);
        }
        navigate('/');

        setFormInput({ userName: "", password: "", role: "" });

    }

    if(user) return navigate('/');

    return (
        <>
            <div className="container-fluid vh-100 py-5 ">
                <div style={{ backgroundColor: "#333", width: "40%" }} className="container py-3 px-5 rounded shadow-lg" >
                    <Form>
                        <Form.Group className="mb-3" controlId="formUserName">
                            <Form.Label className="text-light">UserName</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter User Name"
                                onChange={(e) => setFormInput({ ...formInput, userName: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label className="text-light">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                onChange={(e) => setFormInput({ ...formInput, password: e.target.value })}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between">
                            <div className="mb-3">
                                <Form.Check
                                    inline
                                    name="role"
                                    value="Admin"
                                    type='radio'
                                    checked={formInput.role === 'Admin'}
                                    id='Admin'
                                    onChange={(e) => setFormInput({ ...formInput, role: e.target.value })}

                                />
                                <label className="text-light" htmlFor="Admin">Admin</label>
                                <br />

                                <Form.Check
                                    inline
                                    name="role"
                                    value="MO"
                                    type='radio'
                                    checked={formInput.role === 'MO'}
                                    id='MO'
                                    onChange={(e) => setFormInput({ ...formInput, role: e.target.value })}
                                />
                                <label className="text-light" htmlFor="MO">Medical Officer</label>
                                <br />

                                <Form.Check
                                    inline
                                    name="role"
                                    value="Lab_O"
                                    type='radio'
                                    checked={formInput.role === 'Lab_O'}
                                    id='Lab_O'
                                    onChange={(e) => setFormInput({ ...formInput, role: e.target.value })}
                                />
                                <label className="text-light" htmlFor="Lab_O">Lab Officer</label>



                            </div>

                            <div className="mb-3">
                                <Form.Check
                                    inline
                                    name="role"
                                    value="Hospital_O"
                                    type='radio'
                                    checked={formInput.role === 'Hospital_O'}
                                    id='Hospital_O'
                                    onChange={(e) => setFormInput({ ...formInput, role: e.target.value })}

                                />
                                <label className="text-light" htmlFor="Hospital_O">Hospital Officer</label>
                                <br />

                                <Form.Check
                                    inline
                                    name="role"
                                    value="Chemist"
                                    type='radio'
                                    checked={formInput.role === 'Chemist'}
                                    id='Chemist'
                                    onChange={(e) => setFormInput({ ...formInput, role: e.target.value })}
                                />
                                <label for="Chemist" className="text-light">Chemist</label>
                            </div>
                        </div>

                        <div className="container d-flex justify-content-center">
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={(event) => handleSubmit(event)}
                            >
                                Submit
                            </Button>
                        </div>

                    </Form>
                </div>
            </div>
        </>
    );
}