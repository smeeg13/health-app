import React from "react";
import {Resultats} from "./objects/Resultats";


export const ThemeContext = React.createContext({
    theme: null,
    toggleTheme: () => {}}
);

export const ResultatContext = React.createContext({
    resultat: new Resultats(),
    updateResultatField: () => {},
    updateResultatAll: () => {}}
);

/* Themes to use in the App */
export const themes = {
    light: {
        background: "#fefefe",
        foreground: "#333333",
        
    },
    dark: {
        background: "#030f27",
        foreground: "white",
    },
};