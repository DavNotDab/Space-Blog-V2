import NavBar from "./NavBar";
import {useLayoutEffect} from "react";

export default function Article() {


    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <NavBar/>

            <main className="article-content">
                <div className="article-header">
                    <section className="article-title">
                        <h1>3, 2, 1... Lift off!</h1>
                    </section>
                    <div className="article-image">
                        <picture>
                            <source type="image/jpeg" media="(max-width: 799px)"
                                    srcSet="/assets/img/resized/dawn-360.jpg"/>
                            <source type="image/jpeg" media="(min-width: 800px) and (max-width: 1199px)"
                                    srcSet="/assets/img/resized/dawn-720.jpg"/>
                            <source type="image/jpeg" media="(min-width: 1200px) and (max-width: 1799px)"
                                    srcSet="/assets/img/resized/dawn-1080.jpg"/>
                            <img src="/assets/img/resized/dawn-1600.jpg" alt="An amazing dawn image"/>
                        </picture>
                    </div>
                    <div className="article-info">
                        <p className="article-date">21/11/2022</p>
                        <p className="article-author">By David Ballesteros</p>
                    </div>
                </div>
                <div className="article-main">
                    <div className="article-text">
                        <p>
                            We have just taken off for this breathtaking adventure into the unknown. Come with us if you
                            want to embrace yourself into the mysteries of Space.
                        </p>
                        <p>
                            You will learn amazing facts about Space. From the smallest asteroids to the biggest
                            galaxies. Get to know the unknown by reaching the limits of human comprehension about what
                            is up there.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit
                            urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
                            Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
                            suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                            amet.
                        </p>
                        <p>
                            Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum,
                            vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent
                            lorem orci, mattis non efficitur id, ultricies vel nibh. Sed volutpat lacus vitae gravida
                            viverra. Fusce vel tempor elit. Proin tempus, magna id scelerisque vestibulum, nulla ex
                            pharetra sapien, tempor posuere massa neque nec felis. Aliquam sem ipsum, vehicula ac tortor
                            vel, egestas ullamcorper dui. Curabitur at risus sodales, tristique est id, euismod justo.
                            Mauris nec leo non libero sodales lobortis. Quisque a neque pretium, dictum tellus vitae,
                            euismod neque. Nulla facilisi. Phasellus ultricies dignissim nibh ut cursus. Nam et quam sit
                            amet turpis finibus maximus tempor eget augue. Aenean at ultricies lorem. Sed egestas ligula
                            tortor, sit amet mattis ex feugiat non. Duis purus diam, dictum et ante at, commodo iaculis
                            urna. Aenean lacinia, nisl id vehicula condimentum, enim massa.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit
                            urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
                            Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
                            suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                            amet. Lorem100 ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in
                            hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices
                            mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare
                            leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante
                            fermentum sit amet.
                        </p>
                        <p>
                            Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum,
                            vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent
                            lorem orci, mattis non efficitur id, ultricies vel nibh. Sed volutpat lacus vitae gravida
                            viverra. Fusce vel tempor elit. Proin tempus, magna id scelerisque vestibulum, nulla ex
                            pharetra sapien, tempor posuere massa neque nec felis. Aliquam sem ipsum, vehicula ac tortor
                            vel, egestas ullamcorper dui. Curabitur at risus sodales, tristique est id, euismod justo.
                            Mauris nec leo non libero sodales lobortis. Quisque a neque pretium, dictum tellus vitae,
                            euismod neque. Nulla facilisi. Phasellus ultricies dignissim nibh ut cursus. Nam et quam sit
                            amet turpis finibus maximus tempor eget augue. Aenean at ultricies lorem. Sed egestas ligula
                            tortor, sit amet mattis ex feugiat non. Duis purus diam, dictum et ante at, commodo iaculis
                            urna. Aenean lacinia, nisl id vehicula condimentum, enim massa.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit
                            urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
                            Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
                            suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                            amet.
                        </p>
                    </div>
                </div>
            </main>

        </>
    );
}
