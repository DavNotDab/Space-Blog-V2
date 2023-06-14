import NavBar from "./NavBar";
import {useLayoutEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

export default function Article() {

    const user = useSelector((state) => state.user);

    const params = useParams();
    const id = params.id;
    const [article, setArticle] = useState({});

    const getArticle = async () => {
        if (id) {
            try {
                const response = await axios.get(`/api/get-article/${id}`);
                console.log(response.data)
                setArticle(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        getArticle();
        console.log(article)

    }, []);

    return (
        <>
            <NavBar/>

            {article ?
                <main className="article-content">
                    <div className="article-header">
                        <section className="article-title mt-5">
                            <h1>{article.title}</h1>
                        </section>
                        <div className="article-image">
                            <img src={"/assets/article-images/" + article.image} alt="Image of the article"/>
                        </div>
                        <div className="article-info">
                            <p className="article-date">{formatDate(article.created_at)}</p>
                            <p className="article-author">By {article.user?.name}</p>
                            {
                                article.user_id === user?.id ?
                                    <p><Link className="article-edit" to={"/edit-article/" + article.id}>Edit article</Link></p>
                                    : null
                            }
                        </div>
                    </div>
                    <div className="article-main">
                        <div className="article-text">
                            <p>
                                {article.content?.split("\n").map((paragraph, index) => {
                                    return (
                                        <span key={"paragraph-" + index}>
                                        {paragraph}
                                        <br/> <br/>
                                    </span>
                                    );
                                })}
                            </p>

                        </div>
                    </div>
                </main>
                :
                <h1>Article not found</h1>
            }

        </>
    );
}
