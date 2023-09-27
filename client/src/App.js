import { Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from "./components/ThemeContext";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Spaces from './components/Spaces';
import SpaceDetails from './components/SpaceDetails';
import CreateReservation from './components/CreateReservation';
import Admin from './components/Admin';
import AccountSettings from './components/AccountSettings';
import UserContextProvider from './components/UserContext';
import CreateSpace from './components/CreateSpace';
import DeleteSpace from './components/DeleteSpace';
import UpdateSpace from './components/UpdateSpace';
import DeleteReservations from './components/DeleteReservations';
import ReservationDetails from './components/ReservationDetails';
import UpdateReservation from './components/UpdateReservation';
import ViewUsers from './components/ViewUsers'; 
import UpdateUser from './components/UpdateUser';
import AddUser from './components/CreateUser';


function App() {



  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Navbar />
        <Routes>         
          <Route path="/" element={ <LandingPage />}/> 
          <Route path="/:userId/spaces" element={<Spaces />} />
          <Route path="/:userId/spacedetails/:roomId" element={<SpaceDetails />} />
          <Route path="/:userId/reservations/:roomId" element={<CreateReservation />} />        
          <Route path="/:userId/reservationdetails/:reservationId" element={<ReservationDetails />} />
          <Route path="/:userId/admin" element={<Admin />} />
          <Route path="/:userId/Account" element={<AccountSettings />} />
          <Route path="/:userId/createspace" element={<CreateSpace />} />
          <Route path="/:userId/deletespace/:id" element={<DeleteSpace />} />
          <Route path="/:userId/updatespace/:id" element={<UpdateSpace />} />
          <Route path="/:userId/ManageReservations" element={<DeleteReservations />} />
          <Route path="/:userId/updatereservation/:id" element={<UpdateReservation />} />
          <Route path="/users/:userId/edit" element={<UpdateUser />} />
          <Route path="/users/create" element={<AddUser />} />
          <Route path="/users" element={<ViewUsers />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
