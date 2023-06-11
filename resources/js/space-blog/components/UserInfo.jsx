import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import loadStatus from "./ApiResources";

export default function UserInfo() {

    const user = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserInfo = async () => {
        try {
            const response = await axios.get('/api/get-user-info');
            console.log(response.data)
            setUserInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async () => {

        const activateModal = document.getElementById('activate-modal');
        activateModal.click();

        try {
            axios.get('/api/set-writer-role').then(response => {
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

    useEffect(() => {

        user ? getUserInfo() : navigate('/login')

    }, [user])

    return (
        <>
            <div className="container text-center p-2 mt-2">
                <h2>User's information</h2>
                <div className="profile-subscriptions-content mt-5">
                      { user ? (
                        <div className="container p-4 pb-0">
                            <div className="d-flex flex-wrap align-items-center px-5">
                                <div className="col-6 mt-3 text-center">
                                    <h4>Name:</h4>
                                </div>
                                <div className="col-6 mt-3 text-center">
                                    <h4>{user.name}</h4>
                                </div>
                                <div className="col-6 mt-3 text-center">
                                    <h4>Email:</h4>
                                </div>
                                <div className="col-6 mt-3 text-center">
                                    <h4>{user.email}</h4>
                                </div>
                            </div>

                            <div className="d-flex flex-wrap align-items-center px-5 mt-5">
                                <div className="col-6 mt-0 text-center">
                                    <h4>User rol:</h4>
                                </div>
                                <div className="col-6 mt-0 text-center">
                                    <h4>{userInfo.role}</h4>
                                    {
                                        userInfo.role === "reader" ?
                                            <span className="nav-button">
                                                <button className="upgrade-button" onClick={handleSubmit}>
                                                    Upgrade to writer
                                                </button>
                                            </span>

                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="container text-center p-2 mt-3">
                            <h1>You are not logged in</h1>
                        </div>
                    )}
                </div>
            </div>

            <button id="activate-modal" hidden data-bs-toggle="modal" data-bs-target="#emailVerification"></button>

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
                                <div className="container d-flex flex-column justify-content-center">
                                    <div className="container text-center p-2">
                                        <h1>Done!</h1>
                                    </div>

                                    <div className="container text-center p-2 mt-2">
                                        <h2>You are now a writer!</h2>
                                        <h3>You will be able to contribute to the blog!</h3>
                                        <br/>
                                        <h3>We have sent you an email confirming your purchase</h3>
                                        <div className="m-4 nav-button" data-bs-dismiss="modal" aria-label="Close">
                                            <h5>
                                                <Link className="upgrade-button" to={"/#blog"}>See the blog</Link>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
