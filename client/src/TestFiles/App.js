
import React from 'react';import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginScreen from './components/Context';
import LandingPage from './components/LandingPage'

export const themes = {
  
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};

const UserContext = React.createContext()
const ThemeContext = React.createContext()

const UserContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState({ firstname: "", lastname: "" });

    useEffect(() => { }, [currentUser])

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => { return useContext(UserContext) };

const ThemeContextProvider = ({ children }) => {

    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => { }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => { return useContext(ThemeContext) };
const App = () => {
    return (
        <>
            {/* <Navbar /> */}
            <ThemeContextProvider>
                <UserContextProvider>
                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/content" element={<Content />}/>
                        <Route path="/profilepage" element={<ProfilePage />}/>
                    </Routes>
                </UserContextProvider>
            </ThemeContextProvider>
        </>
    )
}

function Content() {
    const {currentUser, setCurrentUser} = useUserContext();
    const {theme, toggleTheme} = useThemeContext();
    const navigate = useNavigate();
    return (
                        <div style={{backgroundColor: themes[theme].background}}>
                            <h1>Content Page!</h1>
                            <h1>Welcome {`${currentUser.firstname} ${currentUser.lastname}`}!</h1>
                            <button onClick={() => {toggleTheme()}}>Switch to {theme === 'light' ? 'dark' : 'light'} mode</button>
                            <button onClick={() => { navigate("/profilepage") }}>View another page with context</button>
                            <button onClick={() => { 
                            setCurrentUser({firstname: "", lastname: ""});
                            navigate("/") }}>Logout</button>

                        </div>
    );
}

function ProfilePage() {
    const {currentUser, setCurrentUser} = useUserContext();
    const {theme, toggleTheme} = useThemeContext();
    const navigate = useNavigate();
    return (
                        <div style={{backgroundColor: themes[theme].background}}>
                            <h1>Profile Page!</h1>
                            <button onClick={() => {toggleTheme()}}>Switch to {theme === 'light' ? 'dark' : 'light'} mode</button>
                            <button onClick={() => { navigate("/content") }}>View another page with context</button>
                            <button onClick={() => { 
                            setCurrentUser({firstname: "", lastname: ""});
                            navigate("/") }}>Logout</button>
                            <h1>Welcome {`${currentUser.firstname} ${currentUser.lastname}`}!</h1>
                        </div>
    );
}

export default App;
