import { Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from "./components/ThemeContext";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Rooms from './components/Rooms';
import SpaceDetails from './components/SpaceDetails';
import Reservation from './components/Reservation';
import Admin from './components/Admin';
import AccountSettings from './components/AccountSettings';
import UserContextProvider from './components/UserContext';
import AddSpace from './components/AddSpace';
import RemoveSpace from './components/RemoveSpace';
import EditSpace from './components/EditSpace';
import ManageReservations from './components/ManageReservations';
import ReservationDetails from './components/ReservationDetails';
import EditReservation from './components/EditReservation'; 


function App() {



  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Navbar />
        <Routes>         
          <Route path="/" element={ <LandingPage />}/> 
          <Route path="/:userId/rooms" element={<Rooms />} />
          <Route path="/:userId/spacedetails/:roomId" element={<SpaceDetails />} />
          <Route path="/:userId/reservations/:roomId" element={<Reservation />} />        
          <Route path="/:userId/reservationdetails/:reservationId" element={<ReservationDetails />} />
          <Route path="/:userId/admin" element={<Admin />} />
          <Route path="/:userId/Account" element={<AccountSettings />} />
          <Route path="/:userId/addspace" element={<AddSpace />} />
          <Route path="/:userId/removespace/:id" element={<RemoveSpace />} />
          <Route path="/:userId/editspace/:id" element={<EditSpace />} />
          <Route path="/:userId/ManageReservations" element={<ManageReservations />} />
          <Route path="/:userId/editreservation/:id" element={<EditReservation />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
