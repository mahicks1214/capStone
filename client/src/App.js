import { Routes, Route } from 'react-router-dom';
import { ContextProvider } from "./components/Context";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import UserHomePage from './components/UserHomePage';
import Rooms from './components/Rooms';
import SpaceDetails from './components/SpaceDetails';

function App() {
  return (
    <ContextProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/userhomepage" element={<UserHomePage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/spacedetails/:id" element={<SpaceDetails />} /> 
        </Routes>
      <Footer />
  </ContextProvider>
  );
}

export default App;
