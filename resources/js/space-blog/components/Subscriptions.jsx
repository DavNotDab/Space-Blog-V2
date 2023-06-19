import {useSelector} from "react-redux";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Subscriptions() {

    const user = useSelector((state) => state.user);
    const [subscriptions, setSubscriptions] = useState([]);

    const navigate = useNavigate();

    const getUserSubscriptions = async () => {
        try {
            axios.get('/api/get-user-subscriptions').then(response => {
                console.log(response.data)
                setSubscriptions(response.data);

            });
        } catch (error) {
            console.log(error);
        }
    }

    const toggleSubscription = (publisher) => {
        try {
            axios.post('/api/toggle-subscription', {publisher: publisher})
                .then(response => {
                    console.log(response.data);
                    getUserSubscriptions();
                });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        getUserSubscriptions();
    }, []);


    return (
        <>
            <div className="container text-center p-2 mt-2">
                <h2>User's subscriptions</h2>
                <br/>
                <h6>Here you can enable or disable your news subscriptions to publishers</h6>
                <div className=" profile-subscriptions-content mt-5">
                    { subscriptions.length ?
                        (
                        <>
                            <div className="container p-4 pb-0">
                                <div className="d-flex flex-row g-5 align-items-center text-decoration-underline">
                                    <div className="col-6 mt-0 text-center">
                                        <h4>Publisher</h4>
                                    </div>
                                    <div className="col-6 mt-0 text-center">
                                        <h4>Status</h4>
                                    </div>
                                </div>
                            </div>

                            {subscriptions.map(subscription => (
                                <div key={subscription.id} className="container p-4">
                                    <div className="d-flex flex-row g-5 align-items-center">
                                        <div className="col-6 mt-0 text-center">
                                            {subscription.publisher}
                                        </div>
                                        <div className="col-6 mt-0 text-center">
                                            {subscription.active ? (
                                                <button className="accent" onClick={() => toggleSubscription(subscription.publisher)}>Enabled</button>
                                            ) : (
                                                <button className="accent" onClick={() => toggleSubscription(subscription.publisher)}>Disabled</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                        ) : (
                        <div className="container text-center p-2 my-5">
                            <h2>You don't have any subscriptions to any publisher</h2>
                                <div className="nav-button mt-5">
                                    <button className="accent">
                                        <Link className="accent" to="/news">View news</Link>
                                    </button>
                                </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
