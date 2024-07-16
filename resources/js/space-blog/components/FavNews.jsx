import {useSelector} from "react-redux";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function FavNews() {

    const user = useSelector((state) => state.user);
    const [news, setNews] = useState([]);

    const navigate = useNavigate();

    const getUserFavoriteNewsId = async () => {
        try {
            axios.get('/api/get-user-favorite-news').then(response => {
                const favorites_ids = response.data.map(favorite => favorite.new_id);

                setNews(news.splice(0, news.length));

                favorites_ids.forEach(favorite_id => {
                    getFavoriteNew(favorite_id);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getFavoriteNew = async (image_id) => {
        try {
            axios.get(`https://api.spaceflightnewsapi.net/v4/articles/${image_id}`, {
            }).then(response => {
                setNews(news => [...news, response.data]);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const saveNewAsFavorite = (new_id) => {
        try {
            axios.post('/api/save-favorite-new', {new_id: new_id})
                .then(response => {
                    console.log(response.data);
                    setNews(news.splice(0, news.length));

                    getUserFavoriteNewsId();
                });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        getUserFavoriteNewsId();
    }, []);


    return (
        <>
            <div className="container text-center p-2 mt-2">
                <h2>Favorite News</h2>
                <div className="row profile-gallery-content mt-5">
                    { news.length ? (
                        news.map(notice => (
                            <div key={notice.id} className="container py-5">
                                <div className="card mb-3 m-4" style={{background: "none"}}>
                                    <div className="row g-5 align-items-center">
                                        <div className="col-md-4 mt-0 d-flex align-items-center justify-content-center">
                                            <img src={notice.imageUrl}
                                                 alt="Image of the new" className="img-fluid"/>
                                        </div>
                                        <div className="col-md-8 mt-0 p-3">
                                            <div className="card-body p-0">
                                                <h5 className="new-title card-title text-center fw-bold fs-3" style={{letterSpacing: 1}}>
                                                    {notice.title}
                                                </h5>
                                                <span className="new-date">
                                                            {notice.publishedAt.slice(0, 16).replace('T', ' ')}
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
                                                            { notice.newsSite}
                                                        </small>
                                                        <span className="fav-new" onClick={() => saveNewAsFavorite(notice.id, notice.newsSite)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 width="16" height="16"
                                                                 fill="#DB9562"
                                                                 className="bi bi-star-fill"
                                                                 viewBox="0 0 16 16">
                                                                {
                                                                    news.includes(notice) ? (
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

                        ))) : (
                        <div className="container text-center p-2 my-5">
                            <h2>You don't have any favorite news</h2>
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
