import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Blog() {

    const user = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({});
    const [articles, setArticles] = useState([]);

    const getUserInfo = async () => {
        try {
            const response = await axios.get('/api/get-user-info');
            console.log(response.data)
            setUserInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getArticles = async () => {
        try {
            const response = await axios.get('/api/get-articles');
            console.log(response.data)
            setArticles(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options);
    }

    useEffect(() => {
        getUserInfo()
        getArticles()

    }, [user])

    return (
        <div className="blog" id="blog">
            {
                userInfo?.role === "writer" ?
                    <section className="add-article nav-button">
                        <small>
                            <Link to={"/add-article"} className="add-article-content accent">
                                Write a new article
                            </Link>
                        </small>
                    </section>
                :
                    <section className="writer-ad nav-button">
                        <small>
                            <Link to={user ? "/profile" : "/login"} className="writer-ad-content accent">
                                Would you like to contribute to the blog?
                            </Link>
                        </small>
                    </section>
            }

            <section className="blog-heading">
                <h2 className="blog-title">Welcome to the blog</h2>
            </section>

            <div className="blog-content">

                {articles && articles.map((article, index) => {
                    return (
                        <div key={"article-" + index} className="blog-entry">
                            <div className="entry-image">
                                <img src={"/assets/article-images/" + article.image} alt="Image of the article"/>
                            </div>
                            <div className="entry-content">
                                <section className="entry-heading">
                                    <h2 className="entry-title">{article.title}</h2>
                                    <h3 className="entry-date">{formatDate(article.created_at)}</h3>
                                </section>
                                <div className="entry-text">
                                    <p>
                                        {article.description}
                                    </p>
                                    <div className="entry-readFullArticle">
                                        <Link to={"/article/" + article.id}>Read the full article</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div className="blog-entry">
                    <div className="entry-image">
                        <picture>
                            <source type="image/jpeg" media="(max-width: 799px)"
                                    srcSet="/assets/img/resized/liftOff2-360.jpg"/>
                            <source type="image/jpeg" media="(min-width: 800px) and (max-width: 1199px)"
                                    srcSet="/assets/img/resized/liftOff2-720.jpg"/>
                            <source type="image/jpeg" media="(min-width: 1200px) and (max-width: 1799px)"
                                    srcSet="/assets/img/resized/liftOff2-1080.jpg"/>
                            <img src="/assets/img/resized/liftOff2-1600.jpg"
                                 alt="An amazing liftoff image"/>
                        </picture>
                    </div>
                    <div className="entry-content">
                        <section className="entry-heading">
                            <h2 className="entry-title">3, 2, 1... Lift off!</h2>
                            <h3 className="entry-date">01/11/2022</h3>
                        </section>
                        <div className="entry-text">
                            <p>
                                We have just taken off for this breathtaking adventure into the unknown.
                                Come with us if you want to embrace yourself into the mysteries of Space.
                            </p>
                            <p>
                                You will learn amazing facts about Space. From the smallest asteroids to
                                the biggest galaxies. Get to know the unknown by reaching the limits of
                                human comprehension about what is up there.
                            </p>
                            <div className="entry-readFullArticle">
                                <Link to={"/article"}>Read the full article</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="blog-entry">
                    <div className="entry-image">
                        <picture>
                            <source type="image/jpeg" media="(max-width: 799px)"
                                    srcSet="/assets/img/resized/eclipse-360.jpg"/>
                            <source type="image/jpeg" media="(min-width: 800px) and (max-width: 1199px)"
                                    srcSet="/assets/img/resized/eclipse-720.jpg"/>
                            <source type="image/jpeg" media="(min-width: 1200px) and (max-width: 1799px)"
                                    srcSet="/assets/img/resized/eclipse-1080.jpg"/>
                            <img src="/assets/img/resized/eclipse-1600.jpg"
                                 alt="An amazing solar eclipse image"/>
                        </picture>
                    </div>
                    <div className="entry-content">
                        <section className="entry-heading">
                            <h2 className="entry-title">Total solar eclipse in Proxima Centauri</h2>
                            <h3 className="entry-date">02/11/2022</h3>
                        </section>
                        <div className="entry-text">
                            <p>
                                Recent research has found that in November 6th a total solar eclipse will
                                occur in Proxima Centauri.
                            </p>
                            <p>
                                You will learn amazing facts about Space. From the smallest asteroids to
                                the biggest galaxies. Get to know the unknown by reaching the limits of
                                human comprehension about what is up there.
                            </p>
                            <span className="entry-readFullArticle">
                                <Link to={"/article"}>Read the full article</Link>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
