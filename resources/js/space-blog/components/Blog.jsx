import {Link} from "react-router-dom";

export default function Blog() {

    return (
        <div className="blog" id="blog">
            <section className="blog-heading">
                <h2 className="blog-title">Welcome to the blog</h2>
            </section>

            <div className="blog-content">
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
