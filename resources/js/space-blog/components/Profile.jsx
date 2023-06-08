import {useSelector} from "react-redux";
import NavBar from "./NavBar";
import ProfileMenu from "./ProfileMenu";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Profile() {

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user)

        if (!user) {
            navigate('/login')
        }
    }, [user])

    return (
        <>
            <NavBar page={'profile'}/>

            <main className="container d-flex flex-column justify-content-center profile-content">
                {user ? (
                    <>
                        <div className="container text-center d-flex flex-row align-items-center justify-content-around p-2 my-3">
                            <h1>User Profile</h1>
                            <h3>{user.name}</h3>
                        </div>

                        <ProfileMenu/>
                    </>
                ) : (
                    <div className="container text-center p-2 mt-3">
                        <h1>You are not logged in</h1>
                    </div>
                )}
            </main>
        </>
    );
}
