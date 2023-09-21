import { Routes, Route } from 'react-router-dom';
import { ContextProvider } from "./components/Context";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <ContextProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      <Footer />
  </ContextProvider>
  );
}

export default App;
