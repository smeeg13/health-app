import React from "react";
import {Resultats} from "./objects/Resultats";


export const ThemeContext = React.createContext({
    theme: null,
    toggleTheme: () => {}}
);

export const ResultatContext = React.createContext({
    resultat: new Resultats(),
    updateResultatField: () => {},
    updateResultatAll: () => {},
    calculateRes: () => {}}
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
        backgroundresult:"white"
    },
};