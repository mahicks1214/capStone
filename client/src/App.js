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
import AccountSettings from './components/AccountSettings';
import UserContextProvider from './components/UserContext';


function App() {
  return (
    <ContextProvider>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:userId/userhomepage" element={<UserHomePage />} />
          <Route path="/:userId/rooms" element={<Rooms />} />
          <Route path="/:userId/spacedetails/:roomId" element={<SpaceDetails />} />
          <Route path="/:userId/reservations/:roomId" element={<Reservation />} />
          <Route path="/:userId/admin" element={<Admin />} />
          <Route path="/:userId/Account" element={<AccountSettings />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </ContextProvider>
  );
}

export default App;
