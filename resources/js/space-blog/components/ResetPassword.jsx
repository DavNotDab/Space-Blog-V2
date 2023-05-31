import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import NavBar from "@/space-blog/components/NavBar";

export default function ResetPassword() {

    const token = document.getElementById('react-root').getAttribute('data-token');

    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        token: token
    })

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            console.log(values)
            axios.post('/reset-password', values).then(response => {
                console.log(response);
                navigate('/login');
            });

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

    useEffect(() => {
        navigate('/reset-password');
    }, []);

    return (
        <>
            <NavBar page={"register"}/>

            <div className={"form-wrapper container mt-5"}>
                <h1>Reset password</h1>
                <h2 className="reset-password-heading">Please provide your actual password and the new one:</h2>

                <div className={"form-content pt-5 mb-5 mx-auto tab-content"}>
                    <form action="/reset-password" method="POST"  onSubmit={ handleSubmit }>
                        <div className="form-input mb-4">
                            <label className={"form-label"} htmlFor="email">Email: </label>
                            <input className={"form-control"} type="email" id="email" name="email" placeholder="Type your email"  value={values.email || ""} onChange={handleChange} required/>
                        </div>

                        <div className="form-input mb-4">
                            <label className={"form-label"} htmlFor="password">Password: </label>
                            <input className={"form-control"} type="password" id="password" name="password" placeholder="Type your password" value={values.password || ""} onChange={handleChange} required />
                        </div>

                        <div className="form-input mb-4">
                            <label className={"form-label"} htmlFor="password_confirmation">Confirm Password: </label>
                            <input className={"form-control"} type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm your password" value={values.password_confirmation || ""} onChange={handleChange} required />
                        </div>

                        <button className="btn form-button">
                            Send
                        </button>
                        <br/>
                    </form>
                </div>
            </div>
        </>
    );
}
