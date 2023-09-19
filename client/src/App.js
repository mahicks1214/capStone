import { Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage'


const App = () => {
    return (
        <>
        {/* <Navbar /> */}
        <Routes>
            <Route path="/" element={ <LandingPage /> }/>
        </Routes>
        </>
    )    
}

export default App;
