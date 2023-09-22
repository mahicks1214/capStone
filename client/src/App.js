import { Routes, Route } from 'react-router-dom';
import { ContextProvider } from "./components/Context";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import UserHomePage from './components/UserHomePage';
import Rooms from './components/Rooms';
import SpaceDetails from './components/SpaceDetails';
import Reservation from './components/Reservation'; 
import Admin from './components/Admin';

function App() {
  return (
    <ContextProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:userId/userhomepage" element={<UserHomePage />} />
          <Route path="/:userId/rooms" element={<Rooms />} />
          <Route path="/:userId/spacedetails/:roomId" element={<SpaceDetails />} /> 
          <Route path="/:userId/reservations/:roomId" element={<Reservation />} />
          <Route path="/:userId/admin" element={<Admin />} />
        </Routes>
      <Footer />
  </ContextProvider>
  );
}

export default App;
