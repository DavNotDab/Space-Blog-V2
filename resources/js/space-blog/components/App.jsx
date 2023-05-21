import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Article from "./Article";
import News from "./News";
import Gallery from "./Gallery";
import About from "./About";
import Footer from "./Footer";

export default function App() {

    return (
        <Router>
            <main className="content">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/article" element={<Article />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer/>
            </main>
        </Router>
    );
}
