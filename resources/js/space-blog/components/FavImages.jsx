import {useSelector} from "react-redux";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function FavImages() {

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
                setImages(images => [...images, response.data]);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const saveImageAsFavorite = (image_id) => {
        try {
            axios.post('/api/save-favorite-image', {image_id: image_id})
                .then(response => {
                    console.log(response.data);
                    setImages(images.splice(0, images.length));

                    getUserFavoriteImagesId();
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
            <div className="container text-center p-2 mt-2">
                <h2>Favorite Images</h2>
                <div className="row profile-gallery-content mt-5">
                    { images.length ? (
                        images.map((image, index) => (
                            <div key={"image-" + index} className={"image-wrapper w-auto img" + (index + 1)}>
                                <div className="profile-gallery-image"
                                     style={{backgroundImage: `url(${image.urls.raw + "&fit=crop&w=350&h=350"})`, backgroundRepeat: 'no-repeat'}}>
                                    <div className="image-description" data-bs-toggle="modal" data-bs-target={"#image-modal-" + index}>
                                        <img hidden alt={image.description}/>
                                    </div>
                                    <div className="image-info">
                                        <div className="image-author">
                                            {image.user.name}
                                        </div>
                                        <div className="image-stats">
                                            <div className="heart" onClick={() => saveImageAsFavorite(image.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#DB9562"
                                                     className={"bi bi-heart heart-" + image.id} viewBox="0 0 16 16">
                                                    {images.includes(image) ? (
                                                        <path d="M 8 15 C -7.333 4.868 3.279 -3.04 7.824 1.143 c 0.06 0.055 0.119 0.112 0.176 0.171 a 3.12 3.12 0 0 1 0.176 -0.17 C 12.72 -3.042 23.333 4.867 8 15 z"/>
                                                    ) : (
                                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                    )
                                                    }
                                                </svg>
                                            </div>
                                            {images.includes(image) ? (
                                                <span>{image.likes + 1}</span>
                                            ) : (
                                                <span>{image.likes}</span>
                                            )
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="modal fade" id={"image-modal-" + index} tabIndex="-1"
                                     aria-labelledby="image-modal-label" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered modal-lg">
                                        <div className="modal-content">
                                            <div className="close-modal-button">
                                                <button type="button" className="btn-close btn-close-white"
                                                        data-bs-dismiss="modal" aria-label="Close">
                                                </button>
                                            </div>
                                            <img src={image.urls.raw} alt="Image Title"
                                                 className="img-fluid"/>

                                            <div className="modal-footer">
                                                <div className="image-description m-0" id="image-modal-label">
                                                    <span>{image.description}  <small> by {image.user.name}</small></span>
                                                </div>
                                                <div className="modal-author m-0">
                                                    <span></span>
                                                </div>
                                                <div className="image-stats m-0">
                                                    <div className="heart" onClick={() => saveImageAsFavorite(image.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#DB9562"
                                                             className={"bi bi-heart heart-" + image.id} viewBox="0 0 16 16">
                                                            {images.includes(image) ? (
                                                                <path d="M 8 15 C -7.333 4.868 3.279 -3.04 7.824 1.143 c 0.06 0.055 0.119 0.112 0.176 0.171 a 3.12 3.12 0 0 1 0.176 -0.17 C 12.72 -3.042 23.333 4.867 8 15 z"/>
                                                            ) : (
                                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                            )
                                                            }
                                                        </svg>
                                                    </div>
                                                    <span>{image.likes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))) : (
                        <div className="container text-center p-2 my-5">
                            <h2>You don't have any favorite images</h2>
                                <div className="nav-button mt-5">
                                    <button className="accent">
                                        <Link className="accent" to="/gallery">View images</Link>
                                    </button>
                                </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
