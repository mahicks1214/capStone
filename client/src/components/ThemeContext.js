import React, { useContext, useState, useEffect } from "react";

export const ThemeContext = React.createContext();

export const ThemeContextProvider = ({ children }) => {

    const [themeMode, setThemeMode] = useState('dark');

    const contextValue = { themeMode, setThemeMode };


    useEffect(() => {
      localStorage.setItem("themeMode", JSON.stringify(themeMode));
    }, [themeMode]);
  
    return (
      <ThemeContext.Provider
        value={contextValue}
      >
        {children}
      </ThemeContext.Provider>
    );
  };
  
  export const useThemeContext = () => {
    return useContext(ThemeContext);
  };