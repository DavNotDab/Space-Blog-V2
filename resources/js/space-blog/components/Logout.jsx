import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout () {

    const navigate = useNavigate()

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            const response = await axios.post('/logout');
            console.log(response.data)

            navigate('/')

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

    return (
        <div>
            <form action="/logout" method="POST"  onSubmit={ handleSubmit }>
                <button>Logout</button>
            </form>
        </div>
    );

}
