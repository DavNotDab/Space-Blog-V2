import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Article from "./Article";
import News from "./News";
import Gallery from "./Gallery";
import About from "./About";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import VerifyEmail from "./VerifyEmail";
import {useEffect, useState} from "react";
import loadStatus from "./ApiResources";
import {useDispatch, useSelector} from "react-redux";
import Profile from "./Profile";
import ResetPassword from "./ResetPassword";
import AddArticle from "./AddArticle";
import EditArticle from "./EditArticle";

export default function App() {

    const [loading, setLoading] = useState(true)
    const update = useSelector(state=>state.update)

    const dispatch = useDispatch();

    useEffect(() => {
        loadStatus(dispatch).then(() => {
            setLoading(false);
        });
    }, [update]);

    return loading ? (
        <p>Loading...</p>
    ) : (
        <Router>
            <main className="content">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/article/:id?" element={<Article />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/email/verify" element={<VerifyEmail />} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/reset-password/:token?" element={<ResetPassword />} />
                    <Route path="/add-article" element={<AddArticle/>} />
                    <Route path="/edit-article/:id?" element={<EditArticle/>} />
                    <Route path="*" element={<h1>Not found</h1>} />
                </Routes>
                <Footer/>
            </main>
        </Router>
    );
}
