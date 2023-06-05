import NavBar from "./NavBar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Gallery() {

    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('planets');

    window.onscroll = () => {
        document.getElementsByClassName("scroll-up-button")[0].classList.toggle("active", window.scrollY > 500);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getImages = () => {
        try {
            console.log(query)
            axios.get(`https://api.unsplash.com/search/photos?per_page=20&page=${page}&query=${query}`, {
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

    useEffect(() => {
        setImages(images.splice(0, images.length));
        getImages();
    }, [query]);

    return (
        <>
            <NavBar page={'gallery'}/>

            <main className="container d-flex flex-column justify-content-center">

                <div className="container text-center p-2 my-4" id="top">
                    <h1>GALLERY</h1>
                </div>

                <div className="container d-flex justify-content-center flex-wrap mb-5 nav-button gallery-nav">
                    <button onClick={() => setQuery('planets')}>PLANETS</button>
                    <button onClick={() => setQuery('nebula')}>NEBULAE</button>
                    <button onClick={() => setQuery('spacecrafts')}>SPACECRAFTS</button>
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
                                    <div key={index} className="gallery-image" data-bs-toggle="modal" data-bs-target="#image-modal"
                                         style={{backgroundImage: `url(${image.urls.raw + "&fit=crop&w=350&h=350"})`, backgroundRepeat: 'no-repeat'}}>
                                        <div className="image-description">
                                            <img hidden alt={image.description}/>
                                        </div>
                                        <div className="image-info">
                                            <div className="image-author">
                                                {image.user.name}
                                            </div>
                                            <div className="image-stats">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                     className="bi bi-heart" viewBox="0 0 16 16">
                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                </svg>
                                                <span>{image.likes}</span>
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

                <div className="modal fade" id="image-modal" tabIndex="-1" aria-labelledby="image-modal-label" aria-hidden="true">
                    <div className="modal-dialog mt-5">
                        <div className="modal-content email-confirmation-modal">
                            <div className="modal-header border-0">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img src="" alt="" id="image-modal-img"/>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}
