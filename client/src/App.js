
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage'
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import CreateAccount from './components/CreateAccount';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import UserHomePage from './components/UserHomePage';

const App = () => {
    const [auth, setAuth] = useState(false);
    const location = useLocation();
    return (
        <>
            <Navbar />
                <Routes>
                    <Route path="/" element={ auth ? (<LandingPage setAuth={ setAuth } />) : (<Navigate to="/login" state={{ from: location }} replace />)} />
                    <Route path="/login" element={<Login setAuth={ setAuth } />} />
                    <Route path="/landingpage" element={<LandingPage />} />
                    <Route path="/changepassword" element={<ForgotPassword />} />
                    <Route path="/createaccount" element={<CreateAccount />} />
                    <Route path="/userhomepage" element={<UserHomePage />} />
                </Routes>
            <Footer />
        </>
    )
}

export default App;
