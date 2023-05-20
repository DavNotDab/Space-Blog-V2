
export default function Home() {

    return (
        <>
            <div className="background">
                <video autoPlay muted loop preload="auto" id="backgroundVideo">
                    <source src="/assets/video/bgVideo-bait.mp4" type="video/mp4"/>
                </video>
            </div>

            <header>
                <div className="menu">
                    <nav className="menu-content">
                        <div className="logo-title">
                            <div className="logo-title-content">
                                <a href="/">
                                    <img src="/assets/img/icons/logo-bright.png" alt="logo" className="logo"/>
                                        <div className="title">
                                            <span>Space Blog</span>
                                        </div>
                                </a>
                            </div>
                        </div>
                        <div className="nav-content">
                            <div className="nav-menu">
                                <ul>
                                    <li>
                                        <div className="nav-button">
                                            <a href="#"
                                               onClick={() => {window.scrollTo({top: 750, behavior: 'smooth'});}}>Blog</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="nav-button">
                                            <a href="pages/news.html">News</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="nav-button">
                                            <a href="pages/gallery.html">Gallery</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="nav-button">
                                            <a href="pages/about.html">About</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="nav-button">
                                            <button className="surprise" /* TODO onClick="randomPath()"*/>Surprise me!</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="menu-btn">
                            <div className="menu-btn--burger"></div>
                        </div>
                    </nav>
                </div>
            </header>

            <main>
                <img src="/assets/img/resized/bgImage-1080.jpg" alt="background" id="backgroundImage"/>
                    <div className="welcoming">
                        <div className="welcoming-heading">
                            <h1>Welcome to Space</h1>
                        </div>
                        <div className="welcoming-content">
                            <div className="welcoming-message">
                                <p>
                                    Here you will discover what Space actually is like.
                                    Search for information, read news and embrace
                                    yourself into the beauty of the unknown.
                                </p>
                            </div>
                            <div className="visit-blog">
                                <div className="visit-blog-message">
                                    <p>
                                        Visit our blog
                                    </p>
                                </div>
                                <div className="visit-blog-icon">
                                    <button className="visit-blog-arrow"
                                            onClick={()=> {window.scrollTo({top: 750, behavior: 'smooth'});}}>
                                        <img src="/assets/img/icons/arrow-down.svg" alt="arrow-down"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                            <a href="pages/blog.html">Read the full article</a>
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
                                            <a href="pages/blog.html">Read the full article</a>
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
                                <a href="pages/blog.html">Read the full article</a>
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
                                            <a href="pages/blog.html">Read the full article</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </main>

            <footer>
                <div className="footer">
                    <div className="footer-content">
                        <div className="footer-title">
                            <div className="footer-title-content">
                                <a href="index.html">
                                    <img src="/assets/img/icons/logo-bright.png" alt="logo" className="footer-logo"/>
                                        <div className="footer-title">
                                            Space Blog
                                        </div>
                                </a>
                            </div>
                        </div>
                        <div className="footer-socialMedia">
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/" target="-blank">
                                        <img src="/assets/img/icons/facebook.svg" alt="facebook"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/" target="-blank">
                                        <img src="/assets/img/icons/instagram.svg" alt="instagram"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/" target="-blank">
                                        <img src="/assets/img/icons/twitter.svg" alt="twitter"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="author">
                            <div className="github">
                                <a href="https://github.com/DavNotDab">
                                    <img src="/assets/img/icons/github.svg" alt="logo-github" className="gitLogo"/>
                                        <span id="name">DavNotDab</span>
                                </a>
                            </div>
                            <div className="copy">
                                <span>&copy; David Ballesteros Ortiz</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}


