import {useSelector} from "react-redux";
import NavBar from "@/space-blog/components/NavBar";


export default function Profile() {

    const user = useSelector((state) => state.user);

    return (
        <>
            <NavBar/>

            <main className="container d-flex flex-column justify-content-center">
                <div className="container text-center p-2 mt-3">
                    <h1>User Profile</h1>
                </div>

                <div className="container text-center p-2 mt-2">
                    <h3>User: {user.name}</h3>
                    <h3>Email: {user.email}</h3>
                </div>
            </main>
        </>
    );
}
