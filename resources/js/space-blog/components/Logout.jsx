import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadStatus from "./ApiResources";
import {setUpdate} from "../slices/UpdateSlice";
import {useDispatch} from "react-redux";

export default function Logout () {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = async () => {

        try {
            const response = await axios.post('/logout');
            console.log(response.data)

            navigate('/')

            await loadStatus(dispatch);

            dispatch((setUpdate('not-logged')))

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
        <a href={"#"} onClick={handleSubmit}>Logout</a>
    );

}
