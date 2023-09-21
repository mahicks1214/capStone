import { Routes, Route } from 'react-router-dom';
import { ContextProvider } from "./Context";
import Navbar from './Navbar';
import Footer from './Footer';
import LandingPage from './LandingPage';

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
