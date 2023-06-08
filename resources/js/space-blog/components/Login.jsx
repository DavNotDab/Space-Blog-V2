import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import NavBar from "./NavBar";
import {useDispatch} from "react-redux";
import loadStatus from "./ApiResources";
import {setUpdate} from "../slices/UpdateSlice";
import VerifyEmail from "@/space-blog/components/VerifyEmail";
import ForgotPassword from "@/space-blog/components/ForgotPassword";


export default function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            await axios.post('/login', values);

            await axios.get('/api/update-last-login');

            await loadStatus(dispatch);

            dispatch((setUpdate('logged')))

            navigate('/');
            scrollTo(0, 0);

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

    const handleChange = (event) => {
        setValues(previous_values => {
            return ({...previous_values,
                [event.target.name]: event.target.value
            });
        });
    }

    return (
        <>
            <NavBar page={'login'}/>

            <div className={"form-wrapper container-xl mt-5"} style={{marginBottom: "25vh"}}>
                <h1>Login</h1>

                <form className={"form-content pt-5 mx-auto tab-content"} action="/login" method="post" onSubmit={ handleSubmit }>
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

                    <div className="d-flex gap-3 align-items-center">
                        <button className="btn form-button">Login</button>
                        <div className="nav-button forgot-password-link">
                            <a id="activate-modal" data-bs-toggle="modal" data-bs-target="#emailVerification">Forgot password?</a>
                        </div>
                    </div>
                </form>

                <div className="text-center mt-3 nav-button register-here-link">
                    <Link to="/register">Don't have an account? Register here!</Link>
                </div>
            </div>

            <div className="modal fade" id="emailVerification" tabIndex="-1" aria-labelledby="emailVerificationLabel" aria-hidden="true">
                <div className="modal-dialog mt-5">
                    <div className="modal-content email-confirmation-modal">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="bi bi-x-lg"></i></button>
                        </div>
                        <div className="modal-body">
                            { values.email === '' ?
                                <ForgotPassword/>
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
