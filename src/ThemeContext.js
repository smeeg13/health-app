import React from "react";

export const ThemeContext = React.createContext({
    theme: null,
    toggleTheme: () => {}}
);


/* Themes to use in the App */
export const themes = {
    light: {
        background: "#fefefe",
        
    },
    dark: {
        background: "#030f27",
        background_right:"#030f27",
        textcolor:"#fff",
        textcolorbtn:"black",
        button:"#fff",
    },
};