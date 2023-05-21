import {Link} from "react-router-dom";

export default function Footer() {

    return (
        <footer>
            <div className="footer">
                <div className="footer-content">
                    <div className="footer-title">
                        <div className="footer-title-content">
                            <Link to={'/'}>
                                <img src="/assets/img/icons/logo-bright.png" alt="logo" className="footer-logo"/>
                                <div className="footer-title">
                                    Space Blog
                                </div>
                            </Link>
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
    )
}
