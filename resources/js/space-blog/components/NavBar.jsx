import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import UserMenu from "./UserMenu";

export default function NavBar({page}) {

    const navigate = useNavigate();

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


    function randomPath() {
        const paths = [
            '/',
            '/gallery',
            '/news',
            '/about',
            '/profile'
        ];

        navigate(paths[Math.floor(Math.random() * paths.length)]);
    }

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
                                        <button className="surprise" onClick={randomPath}>Surprise me!</button>
                                    </div>
                                </li>

                                <UserMenu/>

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
