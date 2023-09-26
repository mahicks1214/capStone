import React, { useContext, useState, useEffect } from "react";

export const ThemeContext = React.createContext();

export const ContextProvider = ({ children }) => {

    const [themeMode, setThemeMode] = useState(  'dark'//() => {
      // const savedTheme = localStorage.getItem("themeMode");
      // return savedTheme ? JSON.parse(savedTheme) : [];}
      );

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