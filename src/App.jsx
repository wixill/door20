import "./fonts/fonts.css";
import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import MoonseekersPage from "./pages/moonseekers";
import SkwadPage from "./pages/skwad";
import NavBar from "./components/TopNav";
import { useState, useEffect } from "react";

function App() {
    const [currentSection, setCurrentSection] = useState(0);

    function handleScroll(e) {
        e.preventDefault();
        const { deltaY } = e;
        if (deltaY > 0) {
            // Scroll down
            setCurrentSection((prevSection) =>
                prevSection < 1 ? prevSection + 1 : prevSection
            );
        } else {
            // Scroll up
            setCurrentSection((prevSection) =>
                prevSection > 0 ? prevSection - 1 : prevSection
            );
        }
    }

    useEffect(() => {
        window.addEventListener("wheel", handleScroll, { passive: false });
        return () => window.removeEventListener("wheel", handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: window.innerHeight * currentSection,
            behavior: "smooth",
        });
    }, [currentSection]);

    return (
        <Router>
            <NavBar />
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/moonseekers" element={<MoonseekersPage />} />
                    <Route path="/skwad" element={<SkwadPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
