import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./components/authentication-guard";
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
import Loading from "./components/Loading";


function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <Loading />
      </div>
    )
  }

  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Navbar />
        <Routes>
          {/* ---------- Root Route ----------- */}
          <Route path="/" element={<LandingPage />}/>
          <Route path="/Users" element={<ViewUsers />} />
          <Route path="/Spaces" element={<Rooms />} />
          <Route path="/Reservations/" element={<Reservation />} />

          {/* ---------- User Routes ----------- */}
          <Route path="/:userId/Users/Create" element={<AuthenticationGuard component={AddUser} />} />
          <Route path="/:userId/Users" element={<AuthenticationGuard component={ViewUsers} />} />
          <Route path="/:userId/Users/Update" element={<AuthenticationGuard component={EditUser} />} />

          {/* ---------- Space Routes ----------- */}
          <Route path="/:userId/Spaces/Create" element={<AuthenticationGuard component={AddSpace} />} />
          <Route path="/:userId/Spaces" element={<AuthenticationGuard component={Rooms} />} />
          <Route path="/:userId/Spaces/:id" element={<AuthenticationGuard component={SpaceDetails} />} />
          <Route path="/:userId/Spaces/Update/:id" element={<AuthenticationGuard component={EditSpace} />} />
          <Route path="/:userId/Spaces/Delete/:id" element={<AuthenticationGuard component={RemoveSpace} />} />

          {/* ---------- Reservation Routes ---------- */}
          <Route path="/:userId/Reservations/ManageReservations" element={<AuthenticationGuard component={ManageReservations} />} />
          <Route path="/:userId/Reservations/editreservation/:id" element={<AuthenticationGuard component={EditReservation} />} />
          <Route path="/:userId/Reservations/:spaceId" element={<AuthenticationGuard component={Reservation} />} />        
          <Route path="/:userId/Reservations/:reservationId" element={<AuthenticationGuard component={ReservationDetails} />} />

          {/* ---------- Admin Routes ---------- */}
          <Route path="/:userId/Admin" element={<AuthenticationGuard component={Admin} />} />
          <Route path="/:userId/Account" element={<AuthenticationGuard component={AccountSettings} />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
