import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function NavBar({page}) {

    function toggleMenu() {
        const menuBtn = document.querySelector('.menu-btn');
        const nav_content = document.querySelector('.nav-content');
        let menuOpen = false;
        menuBtn.addEventListener('click', () => {
            if(!menuOpen) {
                menuBtn.classList.add('open');
                nav_content.classList.add('active');
                menuOpen = true;

            } else {
                menuBtn.classList.remove('open');
                nav_content.classList.remove('active');
                menuOpen = false;
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.closest('.menu') === null) {
                menuBtn.classList.remove('open');
                nav_content.classList.remove('active');
                menuOpen = false;
            }
        });
    }

    useEffect(() => {
        toggleMenu();
    }, []);



    return (
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
                                        {page ?
                                            <Link to={"/"}>Blog</Link>
                                            :
                                            <a href="#blog">Blog</a>
                                        }

                                    </div>
                                </li>
                                <li>
                                    <div className="nav-button">
                                        <Link to={"/news"}>News</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="nav-button">
                                        <Link to={"/gallery"}>Gallery</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="nav-button">
                                        <Link to={"/about"}>About</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="nav-button">
                                        <button className="surprise" /* TODO onClick="randomPath()" */>Surprise me!</button>
                                        {/*<Link to={"/surprise"} className="surprise">Surprise me!</Link>*/}
                                    </div>
                                </li>
                                <li className="dropdown">
                                    <div className="dropdown-icon">
                                        <i className="bi bi-person" style={{fontSize: "28px"}}></i>
                                    </div>
                                    <ul className="dropdown-content">
                                        <li>
                                            <div className="nav-button">
                                                <Link to={"/login"}>Login</Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="nav-button">
                                                <Link to={"/register"}>Register</Link>
                                            </div>
                                        </li>
                                    </ul>
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
    );

}
