import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "./NavBar";
import {useDispatch} from "react-redux";
import loadStatus from "./ApiResources";
import VerifyEmail from "./VerifyEmail";
import {Link} from "react-router-dom";

export default function Register() {

    const [loading, setLoading] = useState(true);

    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
    })

    const dispatch = useDispatch();

    const [fieldsValid, setFieldsValid] = useState(false);

    const showEmptyFields = () => {
        console.log(fieldsValid)
        // Takes all the fields from the document
        const fields = [...document.querySelectorAll('input, select')];
        // For every field, if it is empty, adds the class "empty" to it. Otherwise, removes it
        fields.forEach(field => {
            if (!verifyField(field)) field.classList.add('invalid-input');
            else field.classList.remove('invalid-input');
        });
    }

    const handleSubmit = async () => {

        const activateModal = document.getElementById('activate-modal');
        activateModal.click();

        try {
            axios.post('/register', values).then(response => {
                console.log(response.data)
                setLoading(false);
            });

            await loadStatus(dispatch);

        } catch (error) {
            switch (error.response.status) {
                case 422:
                    console.log('VALIDATION FAILED:', error.response.data.errors);
                    break;
                case 500:
                    console.log('UNKNOWN ERROR', error.response.data);
                    break;
            }
        }
    }

    const verifyField = (field) => {
        if (field.value === '') return false;

        else if (field.id === 'email') {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(field.value);
        }

        else if (field.id === 'password') {
            const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return regex.test(field.value);
        }

        else if (field.id === 'password_confirmation') {
            const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return regex.test(field.value) && field.value === document.getElementById('password').value;
        }

        return true;
    }

    const handleChange = (event) => {
        // Takes all the fields from the document and checks if they are all filled
        const allFieldsValid = [...document.querySelectorAll('input, select')]
            // For every field, stores in allFieldsValid true if the field is verified, false otherwise
            .every(field => {
                return verifyField(field);
            });

        // Sets the state to true if all fields are verified, false otherwise
        setFieldsValid(allFieldsValid);

        setValues(previous_values => {
            return ({...previous_values,
                [event.target.name]: event.target.value
            });
        });
    }

    return (
        <>
            <NavBar page={"register"}/>

            <div className={"form-wrapper container mt-5"}>
                <h1>Register</h1>

                <div className={"form-content pt-5 mx-auto tab-content"}>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="name">Name: </label>
                        <input className={"form-control"} type="text" id="name" name="name" placeholder="Type your name" value={values.name || ""} onChange={handleChange} required/>
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="email">Email: </label>
                        <input className={"form-control"} type="email" id="email" name="email" placeholder="Type your email"  value={values.email || ""} onChange={handleChange} required/>
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="password">Password: </label>
                        <input className={"form-control"} type="password" id="password" name="password" placeholder="Type your password" value={values.password || ""} onChange={handleChange} required />
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="password_confirmation">Confirm password: </label>
                        <input className={"form-control"} type="password" id="password_confirmation" name="password_confirmation" placeholder="Type your password again" value={values.password_confirmation || ""} onChange={handleChange} required />
                        <br/>
                    </div>

                    <button className="btn form-button"
                            onClick={fieldsValid ? handleSubmit : showEmptyFields}>
                        Register
                    </button>
                    <button id="activate-modal" hidden data-bs-toggle="modal" data-bs-target="#emailVerification"></button>
                </div>

                <div className="text-center mt-3 nav-button already-registered-link">
                    <Link to="/login">Already registered? Log in here!</Link>
                </div>

            </div>

            <div className="modal fade" id="emailVerification" tabIndex="-1" aria-labelledby="emailVerificationLabel" aria-hidden="true">
                <div className="modal-dialog mt-5">
                    <div className="modal-content email-confirmation-modal">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            {loading ?

                                <div className="Loading d-flex gap-3 align-items-center justify-content-center">
                                    <span>Sending email...</span>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                :
                                <VerifyEmail/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
