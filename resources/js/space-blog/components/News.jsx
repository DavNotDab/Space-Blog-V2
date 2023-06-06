import NavBar from "./NavBar";
import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

export default function News() {

    const [news, setNews] = useState([]);
    const [startAt, setStartAt] = useState(0);

    const getNews = async () => {
        try {
            axios.get(`https://api.spaceflightnewsapi.net/v3/articles?_limit=10&_start=${startAt}`).then(response => {
                setNews([...news, ...response.data]);
                setStartAt(startAt + 10);
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setStartAt(0)
        setNews(news.splice(0, news.length));

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

                <div className="">

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
                                    <div key={notice.id} className="container py-sm-5">
                                        <div className="card mb-3 m-4" style={{background: "none"}}>
                                            <div className="row g-5 align-items-center">
                                                <div className="col-md-4 mt-0 d-flex align-items-center justify-content-center">
                                                    <img src={notice.imageUrl}
                                                         alt="Image of the new" className="img-fluid"/>
                                                </div>
                                                <div className="col-md-8 mt-0">
                                                    <div className="card-body px-4">
                                                        <h5 className="card-title text-center fw-bold fs-3" style={{letterSpacing: 1}}>
                                                            {notice.title}
                                                        </h5>
                                                        <span className="new-date">
                                                            {notice.publishedAt.slice(0, 16).replace('T', ' ')}
                                                        </span>
                                                        <h6 className="card-subtitle my-3">
                                                            {notice.summary}
                                                        </h6>
                                                        <p className="card-text fs-6 entry-readFullArticle">
                                                            <a href={notice.url} target="_blank" rel="noreferrer">
                                                                Read more
                                                            </a>
                                                        </p>
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
            </main>
        </>
    );

}
