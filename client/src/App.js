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
import ViewUsers from './components/ViewUsers'; 
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';


function App() {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Navbar />
        <Routes>
          {/* ---------- Root Route ----------- */}
          <Route path="/" element={<LandingPage />}/>
          <Route path="/Reservations/:reservationId" element={<Reservation />} />

          {/* ---------- User Routes ----------- */}
          <Route path="/:userId/Users/Create" element={<AddUser />} />
          <Route path="/:userId/Users" element={<ViewUsers />} />
          <Route path="/:userId/Users/Update" element={<EditUser />} />

          {/* ---------- Space Routes ----------- */}
          <Route path="/:userId/Spaces/Create" element={<AddSpace />} />
          <Route path="/:userId/Spaces" element={<Rooms />} />
          <Route path="/:userId/Spaces/:id" element={<SpaceDetails />} />
          <Route path="/:userId/Spaces/Update/:id" element={<EditSpace />} />
          <Route path="/:userId/Spaces/Delete/:id" element={<RemoveSpace />} />

          {/* ---------- Reservation Routes ---------- */}
          <Route path="/:userId/Reservations/ManageReservations" element={<ManageReservations />} />
          <Route path="/:userId/Reservations/editreservation/:id" element={<EditReservation />} />
          <Route path="/:userId/Reservations/:spaceId" element={<Reservation />} />        
          <Route path="/:userId/Reservations/:reservationId" element={<ReservationDetails />} />

          {/* ---------- Admin Routes ---------- */}
          <Route path="/:userId/Admin" element={<Admin />} />
          <Route path="/:userId/Account" element={<AccountSettings />} />
          
        </Routes>
        <Footer />
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
