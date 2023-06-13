import React, { useState } from 'react';
import axios from "axios";

export default function ForgotPassword() {

    const [values, setValues] = useState({
        email: '',
    })

    const handleSubmit = async () => {

        try {
            console.log(values)
            await axios.post('/forgot-password',
                values,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
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

    return (
        <div className="container d-flex flex-column justify-content-center">
            <div className="container text-center p-2">
                <h2>Forgot password?</h2>
                <h5>Please provide the email you want to reset your password from:</h5>
            </div>

            <div className="container d-flex flex-column justify-content-center">
                <div className="form-input mx-4">
                    <label className="form-label" htmlFor="email">Email: </label>
                    <input className="form-control" type="text" name="email" value={ values.email } onChange={ handleChange } required />
                </div>

                <div className="container text-center p-2 mt-2">
                    <div className="m-4 send-recover-link nav-button">
                        <h2>
                            <a onClick={ handleSubmit } href="https://gmail.com">Send recover link</a>
                        </h2>
                    </div>
                </div>

            </div>
        </div>
    );
}
