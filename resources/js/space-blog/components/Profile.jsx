import {useSelector} from "react-redux";
import NavBar from "./NavBar";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Profile() {

    const user = useSelector((state) => state.user);
    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    const getUserFavoriteImagesId = async () => {
        try {
            axios.get('/api/get-user-favorite-images').then(response => {
                const favorites_ids = response.data.map(favorite => favorite.image_id);

                setImages(images.splice(0, images.length));

                favorites_ids.forEach(favorite_id => {
                    getFavoriteImage(favorite_id);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getFavoriteImage = async (image_id) => {
        try {
            axios.get(`https://api.unsplash.com/photos/${image_id}`, {
                headers: {
                    Authorization: "Client-ID " + import.meta.env.VITE_UNSPLASH_ACCESS_KEY
                }
            }).then(response => {
                setImages(previous_images => {
                    return [...previous_images, response.data];
                });

            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        getUserFavoriteImagesId();
    }, []);


    return (
        <>
            <NavBar/>

            <main className="container d-flex flex-column justify-content-center mb-5">
                {user ? (
                    <>
                        <div className="container text-center p-2 mt-3">
                            <h1>User Profile</h1>
                        </div>

                        <div className="container text-center p-2 mt-2">
                            <h3>User: {user.name}</h3>
                            <h3>Email: {user.email}</h3>
                        </div>

                        <div className="container text-center p-2 mt-2">
                            <h3>Favorite Images</h3>
                            <div className="row profile-gallery-content mt-5">
                                { images.length ? (
                                    images.map(image => (
                                        <div key={image.id} className="profile-gallery-image"
                                             style={{backgroundImage: `url(${image.urls.raw + "&fit=crop&w=200&h=200"})`, backgroundRepeat: 'no-repeat'}}>
                                            <div className="image-description">
                                                <img hidden alt={image.description}/>
                                            </div>
                                        </div>
                                    ))) : (
                                    <div className="container text-center p-2 mt-3">
                                        <h1>You don't have any favorite images</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="container text-center p-2 mt-3">
                        <h1>You are not logged in</h1>
                    </div>
                )}
            </main>
        </>
    );
}
