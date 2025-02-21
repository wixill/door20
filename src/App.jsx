import "./fonts/fonts.css";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import CampaignPage from "./pages/campaign";
import AdminPage from "./pages/admin";
import PdfPage from "./pages/pdf";
import NavBar from "./components/TopNav";
import { useState, useEffect } from "react";

function App() {
    function handlePageLoad() {
        window.scrollTo(0, 0);
    }

    return (
        <Router>
            <NavBar />
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage onPageLoad={() => handlePageLoad()} />
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <AboutPage onPageLoad={() => handlePageLoad()} />
                        }
                    />
                    <Route
                        path="/moonseekers"
                        element={
                            <CampaignPage
                                campaignName="Moonseekers"
                                onPageLoad={() => handlePageLoad()}
                            />
                        }
                    />
                    <Route
                        path="/skwad"
                        element={
                            <CampaignPage
                                campaignName="Skwad"
                                onPageLoad={() => handlePageLoad()}
                            />
                        }
                    />
                    <Route
                        path="/bloomburrow-players-guide"
                        element={
                            <PdfPage onPageLoad={() => handlePageLoad()} />
                        }
                    />
                    <Route
                        path="/20admin"
                        element={
                            <AdminPage onPageLoad={() => handlePageLoad()} />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
