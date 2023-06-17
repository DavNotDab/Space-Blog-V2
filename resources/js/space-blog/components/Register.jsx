import React, {useEffect, useState} from 'react';
import axios from 'axios';
import NavBar from "./NavBar";
import {useDispatch, useSelector} from "react-redux";
import loadStatus from "./ApiResources";
import VerifyEmail from "./VerifyEmail";
import {Link, useNavigate} from "react-router-dom";

export default function Register() {

    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const [emailTaken, setEmailTaken] = useState(false);

    const dispatch = useDispatch();

    const showEmptyFields = () => {
        const fields = [...document.querySelectorAll('input, select')];
        const fieldErrors = {};

        // For every field, if it is empty, adds the class "empty" to it. Otherwise, removes it
        fields.forEach(field => {
            if (!verifyField(field)) {
                switch (field.type) {
                    case 'text':
                        field.value.length < 3 ?
                            fieldErrors[field.id] = ['Minimum length is three.'] :
                            fieldErrors[field.id] = ['Only letters and numbers are allowed.'];
                        break;
                    case 'email':
                        fieldErrors[field.id] = ['Please enter a valid email.'];
                        break;
                    case 'password':
                        field.id === 'password_confirmation' ?
                            fieldErrors[field.id] = ['Passwords do not match.'] :
                            fieldErrors[field.id] = ['Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.'];
                        break;
                    default:
                        fieldErrors[field.id] = ['Please fill this field.'];
                        break;
                }
            }
        });

        setErrors(fieldErrors);
    }

    const handleSubmit = async () => {

        const activateModal = document.getElementById('activate-modal');
        activateModal.click();

        try {
            const response = await axios.post('/register', values);

            console.log(response.data)
            setEmailTaken(false)
            setLoading(false);

            await loadStatus(dispatch);

        } catch (error) {
            if (error.response.status === 422) {
                setEmailTaken(true);
                setLoading(false);
            } else if (error.response.status === 500) {
                console.log('UNKNOWN ERROR', error.response.data);
            }
        }
    }

    const verifyField = (field) => {
        if (field.value === '') return false;

        if (field.id === 'name') {
            const regex = /^[a-zA-Z0-9]{3,}$/;
            return regex.test(field.value);
        }

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
        const field = event.target;
        const fieldErrors = { ...errors };

        if (verifyField(field)) {
            delete fieldErrors[field.id];
        } else {
            switch (field.type) {
                case 'text':
                    field.value.length < 3 ?
                        fieldErrors[field.id] = ['Minimum length is three.'] :
                    fieldErrors[field.id] = ['Only letters and numbers are allowed.'];
                    break;
                case 'email':
                    fieldErrors[field.id] = ['Please enter a valid email.'];
                    break;
                case 'password':
                    field.id === 'password_confirmation' ?
                        fieldErrors[field.id] = ['Passwords do not match.'] :
                        fieldErrors[field.id] = ['Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.'];
                    break;
                default:
                    fieldErrors[field.id] = ['Please fill this field.'];
                    break;
            }
        }

        setErrors(fieldErrors);

        setValues((previousValues) => ({
            ...previousValues,
            [field.name]: field.value
        }));
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [])

    return (
        <>
            <NavBar page={'register'}/>

            <div className={"form-wrapper container mt-5"}>
                <h1>Register</h1>

                <div className={"form-content pt-5 mx-auto tab-content"}>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="name">Name: </label>
                        <input className={`form-control ${errors.name ? 'invalid-input' : ''}`}
                               type="text" id="name" name="name" placeholder="Type your name"
                               value={values.name || ""} onChange={handleChange} required/>
                        {errors.name && <p className="error-message">{errors.name[0]}</p>}
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="email">Email: </label>
                        <input className={`form-control ${errors.email ? 'invalid-input' : ''}`}
                               type="email" id="email" name="email" placeholder="Type your email"
                               value={values.email || ""} onChange={handleChange} required/>
                        {errors.email && <p className="error-message">{errors.email[0]}</p>}
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="password">Password: </label>
                        <input className={`form-control ${errors.password ? 'invalid-input' : ''}`}
                               type="password" id="password" name="password" placeholder="Type your password"
                               value={values.password || ""} onChange={handleChange} required />
                        {errors.password && <p className="error-message">{errors.password[0]}</p>}
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="password_confirmation">Confirm password: </label>
                        <input className={`form-control ${errors.password_confirmation ? 'invalid-input' : ''}`}
                               type="password" id="password_confirmation" name="password_confirmation"
                               placeholder="Type your password again" value={values.password_confirmation || ""}
                               onChange={handleChange} required />
                        {errors.password_confirmation && (
                            <p className="error-message">{errors.password_confirmation[0]}</p>
                        )}
                        <br/>
                    </div>

                    <button className="btn form-button" onClick={Object.keys(errors).length === 0 ? handleSubmit : showEmptyFields}>
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
                            {emailTaken ?
                                <div>
                                    <p className="text-center">This email is already taken.</p>
                                    <p className="text-center">Please try again with a different one.</p>
                                </div>:
                                loading ?

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
