import { Routes, Route } from "react-router-dom"
import LandingPage from "../pages/landing-page.jsx";

function AppRoutes() {
    return ( 
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
    )
};

export default AppRoutes;