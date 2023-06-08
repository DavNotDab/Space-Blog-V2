import NavBar from "./NavBar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Link} from "react-router-dom";

export default function Gallery() {

    const [images, setImages] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('planets');

    if (window) {
        window.onscroll = () => {
            document.getElementsByClassName("scroll-up-button")[0]?.classList.toggle("active", window.scrollY > 500);
        };
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getUserFavoriteImages = () => {
        try {
            axios.get('/api/get-user-favorite-images').then(response => {
                if (response.data) {
                    const favorites = response.data.map(favorite => favorite.image_id);
                    setFavorites(favorites);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getImages = () => {
        try {
            axios.get(`https://api.unsplash.com/search/photos?per_page=18&page=${page}&query=${query}`, {
                headers: {
                    Authorization: "Client-ID " + import.meta.env.VITE_UNSPLASH_ACCESS_KEY
                }
            }).then(response => {
                console.log(response.data.results)
                setImages([...images, ...response.data.results]);
                setPage(page + 1);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const saveImageAsFavorite = (image_id) => {
        try {
            axios.post('/api/save-favorite-image', {image_id: image_id}).then(response => {
                if (!response.data) {
                    const modal_button = document.getElementById("login-or-register-button");
                    modal_button.click();
                }
                else {
                    getUserFavoriteImages();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const calculateSize = (index) => {
        switch (index % 28) {
            case 2:
            case 6:
            case 9:
            case 25:
                return "&fit=crop&w=750&h=350"
            case 5:
            case 14:
            case 18:
            case 20:
                return "&fit=crop&w=350&h=750"
            case 11:
            case 27:
                return "&fit=crop&w=750&h=750"
            default:
                return "&fit=crop&w=350&h=350"
        }

    }

    useEffect(() => {
        setPage(1);
        setFavorites(favorites.splice(0, favorites.length));
        setImages(images.splice(0, images.length));

        getUserFavoriteImages();
        getImages();
    }, [query]);

    return (
        <>
            <NavBar page={'gallery'}/>

            <main className="container-xxl d-flex flex-column justify-content-center">

                <div className="container text-center p-2 my-4" id="top">
                    <h1>GALLERY</h1>
                </div>

                <div className="container d-flex justify-content-center flex-wrap mb-5 nav-button gallery-nav">
                    <button onClick={() => setQuery('planets')}>PLANETS</button>
                    <button onClick={() => setQuery('nebula')}>NEBULAE</button>
                    <button onClick={() => setQuery('spaceship')}>SPACECRAFTS</button>
                    <button onClick={() => setQuery('galaxies')}>GALAXIES</button>
                    <button onClick={() => setQuery('space')}>OTHERS</button>
                </div>

                <div className="container-fluid my-5 ">
                    <InfiniteScroll
                        dataLength={images.length}
                        next={getImages}
                        hasMore={true}
                        loader={<img src="/assets/img/icons/loading.svg" alt="loading..."/>}
                        endMessage="No more images to load"
                    >
                            <div className="row gallery-content">
                                {images.map((image, index) => (
                                    image ? (
                                        <div key={"image-" + index} className={"image-wrapper w-auto img" + (index + 1)}>
                                            <div className="gallery-image"
                                                 style={{backgroundImage: `url(${image.urls.raw + calculateSize(index+1)})`, backgroundRepeat: 'no-repeat'}}>
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
                                                                {favorites.includes(image.id) ? (
                                                                    <path d="M 8 15 C -7.333 4.868 3.279 -3.04 7.824 1.143 c 0.06 0.055 0.119 0.112 0.176 0.171 a 3.12 3.12 0 0 1 0.176 -0.17 C 12.72 -3.042 23.333 4.867 8 15 z"/>
                                                                ) : (
                                                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                                    )
                                                                }
                                                            </svg>
                                                        </div>
                                                        {favorites.includes(image.id) ? (
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
                                                                        {favorites.includes(image.id) ? (
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
                                    ) : (
                                        <img src="/assets/img/icons/loading.svg" alt="loading..." width="100px"/>
                                    )
                                ))}
                            </div>
                    </InfiniteScroll>
                </div>

                <div className="scroll-up-button">
                    <button onClick={scrollToTop} id="scrollToTopBtn" >
                        <i className="bi bi-chevron-up"></i>
                    </button>
                </div>

                <button id="login-or-register-button" data-bs-toggle="modal" data-bs-target="#login-or-register-modal"></button>

                <div className="modal fade" id="login-or-register-modal" tabIndex="-1" aria-labelledby="login-or-register-modal-label" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content login-or-register-modal">
                            <div className="close-modal-button">
                                <button type="button" className="btn-close btn-close-white"
                                        data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body p-1" data-bs-dismiss="modal" aria-label="Close">
                                <div className="modal-heading">
                                    <h4>You need to be logged in to add images as favorites</h4>
                                </div>
                                <div className="modal-buttons">
                                    <Link to="/login" className="btn form-button"> Login </Link>
                                    <Link to="/register" className="btn form-button"> Register </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}
