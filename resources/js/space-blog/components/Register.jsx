import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import NavBar from "./NavBar";

export default function Register() {

    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
    })

    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            const response = await axios.post('/register', values);
            const response_data = response.data;
            console.log(response_data);

            navigate('/');

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
            <NavBar page={"register"}/>

            <div className={"container mt-5 mb-5"}>
                <h1>Register</h1>

                <form className={"pt-5 w-50 mx-auto tab-content"} action="/register" method="post" onSubmit={ handleSubmit }>

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

                    <button className="btn form-button">Register</button>

                </form>

            </div>
        </>
    );
}
