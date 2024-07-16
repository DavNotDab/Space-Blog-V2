import NavBar from "./NavBar";
import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import {Link} from "react-router-dom";

export default function News() {

    const [news, setNews] = useState([]);
    const [startAt, setStartAt] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const [publisher, setPublisher] = useState(null);

    if (window) {
        window.onscroll = () => {
            document.getElementsByClassName("scroll-up-button")[0]?.classList.toggle("active", window.scrollY > 500);
        };
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getUserFavoriteNews = () => {
        try {
            axios.get('/api/get-user-favorite-news').then(response => {
                if (response.data) {
                    const favorites = response.data.map(favorite => favorite.new_id);
                    setFavorites(favorites);
                    console.log(favorites)
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const saveNewAsFavorite = (new_id, publisher) => {
        try {
            axios.post('/api/save-favorite-new', {
                new_id: new_id,
                publisher: publisher
            })
                .then(response => {
                    if (!response.data) {
                        const modal_button = document.getElementById("login-or-register-button");
                        modal_button.click();
                    }
                    else {
                        getUserFavoriteNews();

                        if (response.data[1] !== false) {
                            setPublisher(publisher);

                            const modal_button = document.getElementById("subscription-button");
                            modal_button.click();
                        }
                    }
                });

        } catch (error) {
            console.log(error);
        }
    }

    const getNews = async () => {
        try {
            axios.get(`https://api.spaceflightnewsapi.net/v4/articles/?limit=10&_start=${startAt}`).then(response => {
                console.log(response.data.results)
                setNews([...news, ...response.data?.results]);
                setStartAt(startAt + 10);
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setStartAt(0)
        setFavorites(favorites.splice(0, favorites.length));
        setNews(news.splice(0, news.length));

        getUserFavoriteNews();
        getNews();
    }, []);

    return (
        <>
            <NavBar page={'news'}/>

            <main className="container d-flex flex-column justify-content-center">

                <div className="container text-center p-2 mt-3">
                    <h1>TOP NEWS</h1>
                </div>

                <div id="slider" className="carousel slide mb-5" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#slider" data-bs-slide-to="0" className="active"
                                aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#slider" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#slider" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner" style={{zIndex: -1}}>
                        <div className="carousel-item active">
                            <img src="/assets/img/resized/sunsetCut-1200.jpg" className="d-block slider-img" alt="sunset notice"/>
                                <div className="carousel-caption">
                                    <h5>An amazing sunset</h5>
                                    <p>
                                        Here we can see an astonishing sunset notice taken by Anthony Hawkins in
                                        california
                                    </p>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src="/assets/img/resized/rocketCut-1200.jpg" className="d-block slider-img" alt="rocket notice"/>
                                <div className="carousel-caption">
                                    <h5>SpaceX's new wave of Starlinks is a success</h5>
                                    <p>
                                        The company SpaceX completed successfully his 14th launch of Starlinks this year
                                    </p>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src="/assets/img/resized/nightEarthCut-1200.jpg" className="d-block slider-img" alt="earth notice"/>
                                <div className="carousel-caption">
                                    <h5>Earth's light level has increased yet again</h5>
                                    <p>
                                        A new study reveals a new increment of the Earth's emitted light during nighttime in
                                        the majority of countries
                                    </p>
                                </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

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
                                    <h4>You need to be logged in to add news as favorites</h4>
                                </div>
                                <div className="modal-buttons">
                                    <Link to="/login" className="btn form-button"> Login </Link>
                                    <Link to="/register" className="btn form-button"> Register </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button id="subscription-button" data-bs-toggle="modal" data-bs-target="#subscription-modal"></button>

                <div className="modal fade" id="subscription-modal" tabIndex="-1" aria-labelledby="subscription-modal-label" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content subscription-modal">
                            <div className="close-modal-button">
                                <button type="button" className="btn-close btn-close-white"
                                        data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body p-1" data-bs-dismiss="modal" aria-label="Close">
                                <div className="modal-heading container text-center">
                                    <h4>You successfully subscribed to the publisher {publisher}!</h4>
                                </div>
                                <div className="container mt-3 text-center">
                                    <h6>An email was sent to you with the confirmation of this subscription</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">

                    <InfiniteScroll
                        dataLength={news.length}
                        next={getNews}
                        hasMore={true}
                        loader={<img src="/assets/img/icons/loading.svg" alt="loading..."/>}
                        endMessage="No more notices to load"
                    >
                        <div className="container d-flex flex-column gap-3">
                            { news ?
                                news.map(notice => (
                                    <div key={notice.id} className="container py-5">
                                        <div className="card mb-3 m-4" style={{background: "none"}}>
                                            <div className="row g-5 align-items-center">
                                                <div className="col-md-4 mt-0 d-flex align-items-center justify-content-center">
                                                    <img src={notice.image_url}
                                                         alt="Image of the new" className="img-fluid"/>
                                                </div>
                                                <div className="col-md-8 mt-0 p-3">
                                                    <div className="card-body p-0">
                                                        <h5 className="new-title card-title text-center fw-bold fs-3" style={{letterSpacing: 1}}>
                                                            {notice.title}
                                                        </h5>
                                                        <span className="new-date">
                                                            {notice.published_at.slice(0, 16).replace('T', ' ')}
                                                        </span>
                                                        <h6 className="card-subtitle my-3">
                                                            {notice.summary}
                                                        </h6>
                                                        <div className="card-footer d-flex justify-content-around">
                                                            <p className="card-text entry-readFullArticle me-5 mb-0">
                                                                <a href={notice.url} target="_blank" rel="noreferrer">
                                                                    Read more
                                                                </a>
                                                            </p>
                                                            <p className="card-text entry-author d-flex align-items-center gap-4">
                                                                <small>
                                                                    <span className="published-by">Published by: &nbsp;</span>
                                                                    { notice.news_site}
                                                                </small>
                                                                <span className="fav-new" onClick={() => saveNewAsFavorite(notice.id, notice.newsSite)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         width="16" height="16"
                                                                         fill="#DB9562"
                                                                         className="bi bi-star-fill"
                                                                         viewBox="0 0 16 16">
                                                                        {
                                                                            favorites.includes(notice.id.toString()) ? (
                                                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                                            ) : (
                                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                                                            )
                                                                        }
                                                                    </svg>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <img src="/assets/img/icons/loading.svg" alt="loading..." width="100px"/>
                                )
                            }
                        </div>
                    </InfiniteScroll>

                    <div className="container p-md-5">
                        <div className="card mb-3 m-4" style={{background: "none"}}>
                            <div className="row g-5 align-items-center flex-row-reverse">
                                <div className="col-md-4 d-flex align-items-center justify-content-center">
                                    <picture>
                                        <source type="notice/jpeg" media="(max-width: 768px)"
                                                srcSet="/assets/img/resized/nebula-360.jpg"/>
                                        <source type="notice/jpeg" media="(min-width: 768px) and (max-width: 992px)"
                                                srcSet="/assets/img/resized/nebula-720.jpg"/>
                                        <source type="notice/jpeg" media="(min-width: 992px) and (max-width: 1799px)"
                                                srcSet="/assets/img/resized/nebula-1080.jpg"/>
                                        <img src="/assets/img/resized/nebula-1600.jpg" alt="Pink nebula notice"
                                             className="img-fluid mx-auto"/>
                                    </picture>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body px-4">
                                        <h5 className="card-title text-center fw-bold fs-3" style={{letterSpacing: 1}}>New
                                            nebula discovered</h5>
                                        <h6 className="card-subtitle my-3">There have been reports from NASA that a group of
                                            3 astronauts are currently trapped in the ISS due to a failure in their escape
                                            capsule. </h6>
                                        <p className="card-text fs-6">
                                            <small>
                                                Yesterday in a press report, the White House
                                                announced this shocking new involving three astronauts. One American and two
                                                Russians are stranded in the International Space Station due to some problems
                                                with the capsule they were supposed to come back to Earth in. The US government
                                                is already working together with NASA and SpaceX to find a suitable solution to
                                                address this problem and rescue the astronauts.
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="scroll-up-button">
                    <button onClick={scrollToTop} id="scrollToTopBtn" >
                        <i className="bi bi-chevron-up"></i>
                    </button>
                </div>

                <button id="login-or-register-button" data-bs-toggle="modal" data-bs-target="#login-or-register-modal"></button>

            </main>
        </>
    );

}
