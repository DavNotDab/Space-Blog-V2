import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Logout from "./Logout";


export default function UserMenu() {

    const user = useSelector((state) => state.user);

    if (user) {
        return (
            <li className="dropdown">
                <div className="dropdown-icon">
                    <i className="bi bi-person" style={{fontSize: "28px"}}></i>
                    <i className="bi bi-chevron-down"></i>
                </div>
                <div className="dropdown-content p-3">
                    <ul className="p-4 d-flex flex-column gap-3">
                        <li>
                            <div className="nav-button">
                                <Link to={"/profile"}>Profile</Link>
                            </div>
                        </li>
                        <li>
                            <div className="nav-button">
                                <Logout/>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        );
    }


    return (
        <li className="dropdown">
            <div className="dropdown-icon d-flex align-items-center">
                <i className="bi bi-person" style={{fontSize: "28px"}}></i>
                <i className="bi bi-chevron-down"></i>
            </div>
            <div className="dropdown-content p-3">
                <ul className="p-4 d-flex flex-column gap-3">
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
            </div>
        </li>
    );
}
