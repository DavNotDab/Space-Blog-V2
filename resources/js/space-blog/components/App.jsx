import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";

export default function App() {

    return (
        <Router>
            <main className="content">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </main>
        </Router>
    );
}
