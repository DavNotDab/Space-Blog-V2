import NavBar from "./NavBar";

export default function Gallery() {

    return (
        <>
            <NavBar page={'gallery'}/>

            <main className="container d-flex flex-column justify-content-center">

                <div className="container text-center p-2 my-4">
                    <h1>GALLERY</h1>
                </div>

                <div className="container d-flex justify-content-center flex-wrap mb-5 nav-button gallery-nav">
                    <button>PLANETS</button>
                    <button>NEBULAE</button>
                    <button>SPACECRAFTS</button>
                    <button>GALAXIES</button>
                    <button>OTHERS</button>
                </div>

                <div className="container-fluid my-5 gallery-content">
                    <picture id="img1">
                        <source type="image/jpeg" media="(max-width: 799px)"
                                srcSet="/assets/img/resized/blueNebula-360.jpg"/>
                        <source type="image/jpeg" media="(min-width: 800px) and (max-width: 1199px)"
                                srcSet="/assets/img/resized/blueNebula-720.jpg"/>
                        <img className="image" src="/assets/img/resized/blueNebula-960.jpg" alt="blue nebula image"/>
                    </picture>
                    <picture id="img2">
                        <source type="image/jpeg" media="(max-width: 799px)"
                                srcSet="/assets/img/resized/colorfulGalaxy-360.jpg"/>
                        <source type="image/jpeg" media="(min-width: 800px) and (max-width: 1199px)"
                                srcSet="/assets/img/resized/colorfulGalaxy-720.jpg"/>
                        <img className="image" src="/assets/img/resized/colorfulGalaxy-960.jpg"
                             alt="colorful galaxy image"/>
                    </picture>
                    <picture id="img3">
                        <source type="image/jpeg" media="(max-width: 799px)"
                                srcSet="/assets/img/resized/nebulaGalaxy-360.jpg"/>
                        <source type="image/jpeg" media="(min-width: 800px) and (max-width: 1199px)"
                                srcSet="/assets/img/resized/nebulaGalaxy-720.jpg"/>
                        <img className="image" src="/assets/img/resized/nebulaGalaxy-960.jpg"
                             alt="galaxy in nebula image"/>
                    </picture>
                    <picture id="img4">
                        <source type="image/jpeg" media="(max-width: 799px)"
                                srcSet="/assets/img/resized/liftOffRay-360.jpg"/>
                        <source type="image/jpeg" media="(min-width: 800px) and (max-width: 1199px)"
                                srcSet="/assets/img/resized/liftOffRay-720.jpg"/>
                        <img className="image" src="/assets/img/resized/liftOffRay-960.jpg"
                             alt="rocket liftoff leaving tray image"/>
                    </picture>
                    <picture id="img5">
                        <source type="image/jpeg" media="(max-width: 799px)"
                                srcSet="/assets/img/resized/galaxy-360.jpg"/>
                        <source type="image/jpeg" media="(min-width: 800px) and (max-width: 1199px)"
                                srcSet="/assets/img/resized/galaxy-720.jpg"/>
                        <img className="image" src="/assets/img/resized/galaxy-960.jpg" alt="big galaxy image"/>
                    </picture>
                    <picture id="img6">
                        <source type="image/jpeg" media="(max-width: 799px)"
                                srcSet="/assets/img/resized/moon-360.jpg"/>
                        <source type="image/jpeg" media="(min-width: 800px) and (max-width: 1199px)"
                                srcSet="/assets/img/resized/moon-720.jpg"/>
                        <img className="image" src="/assets/img/resized/moon-960.jpg" alt="moon image"/>
                    </picture>
                    <picture id="img7">
                        <source type="image/jpeg" media="(max-width: 799px)"
                                srcSet="/assets/img/resized/mountainStars-360.jpg"/>
                        <source type="image/jpeg" media="(min-width: 800px) and (max-width: 1199px)"
                                srcSet="/assets/img/resized/mountainStars-720.jpg"/>
                        <img className="image" src="/assets/img/resized/mountainStars-960.jpg"
                             alt="stars above a mountain image"/>
                    </picture>
                </div>


            </main>
        </>
    );
}
