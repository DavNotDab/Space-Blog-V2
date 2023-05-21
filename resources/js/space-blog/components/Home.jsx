import Blog from "./Blog";
import NavBar from "./NavBar";
import {useEffect} from "react";

export default function Home() {

    function loadVideo() {
        let video = document.getElementById("backgroundVideo");
        if ( window.innerWidth > 800 ) { video.src = "/assets/video/bgVideo-1080.mp4"; }
        if ( window.innerWidth <= 800 ) { video.src = "/assets/video/bgVideo-720.mp4"; }
        if ( window.innerWidth <= 600 ) { video.src = "/assets/video/bgVideo-480.mp4"; }
        if ( window.innerWidth <= 450 ) { video.src = "/assets/video/bgVideo-360.mp4"; }

        video.load();
    }

    useEffect(() => {
        loadVideo();
    }, []);

    return (
        <>
            <div className="background">
                <video autoPlay muted loop preload="auto" id="backgroundVideo">
                    <source src="/assets/video/bgVideo-bait.mp4" type="video/mp4"/>
                </video>
            </div>

            <NavBar/>

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

                   <Blog/>

            </main>
        </>
    );
}


