import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./components/authentication-guard";
import { Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from "./components/ThemeContext";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Spaces from './components/Spaces';
import SpaceDetails from './components/SpaceDetails';
import Admin from './components/Admin';
import AccountSettings from './components/AccountSettings';
import UserContextProvider from './components/UserContext';
import CreateSpace from './components/CreateSpace';
import DeleteSpace from './components/DeleteSpace';
import UpdateSpace from './components/UpdateSpace';
import Reservations from './components/Reservations';
import ViewReservations from './components/ViewReservations'
import ReservationDetails from './components/ReservationDetails';
import UpdateReservation from './components/UpdateReservation';
import ViewUsers from './components/ViewUsers'; 
import UpdateUser from './components/UpdateUser';
import CreateUser from './components/CreateUser';
import Loading from './components/Loading';
import Credits from './components/Credits';
import Logo from './components/Logo'


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
          <Route path="/Spaces" element={<Spaces />} />
          <Route path="/Reservations" element={<Reservations />} />
          <Route path="/Reservations/:reservationId" element={<ReservationDetails />} />

          {/* ---------- User Routes ----------- */}
          <Route path="/:userId/Users/Create" element={<AuthenticationGuard component={CreateUser} />} />
          <Route path="/:userId/Users" element={<AuthenticationGuard component={ViewUsers} />} />
          <Route path="/:userId/Users/Update" element={<AuthenticationGuard component={UpdateUser} />} />

          {/* ---------- Space Routes ----------- */}
          <Route path="/:userId/Spaces/Create" element={<AuthenticationGuard component={CreateSpace} />} />
          <Route path="/:userId/Spaces" element={<AuthenticationGuard component={Spaces} />} />
          <Route path="/:userId/Spaces/:spaceId" element={<AuthenticationGuard component={SpaceDetails} />} />
          <Route path="/:userId/Spaces/Update/:spaceId" element={<AuthenticationGuard component={UpdateSpace} />} />
          <Route path="/:userId/Spaces/Delete/:spaceId" element={<AuthenticationGuard component={DeleteSpace} />} />

          {/* ---------- Reservation Routes ---------- */}
          <Route path="/:userId/Reservations" element={<AuthenticationGuard component={ViewReservations} />} />
          <Route path="/:userId/Reservations/ManageReservations" element={<AuthenticationGuard component={Reservations} />} />
          <Route path="/:userId/Reservations/EditReservation/:reservationId" element={<AuthenticationGuard component={UpdateReservation} />} />
          <Route path="/:userId/Reservations/:spaceId" element={<AuthenticationGuard component={Reservations} />} />        
          <Route path="/:userId/Reservations/:reservationId" element={<AuthenticationGuard component={ReservationDetails} />} />

          {/* ---------- Admin Routes ---------- */}
          <Route path="/:userId/Admin" element={<AuthenticationGuard component={Admin} />} />
          <Route path="/:userId/Account" element={<AuthenticationGuard component={AccountSettings} />} />

          {/* ---------- Alt Routes ---------- */}
          <Route path="/Credits" element={<Credits />} />
          <Route path="/Logo" element={<Logo />} />

        </Routes>
        <Footer />
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
