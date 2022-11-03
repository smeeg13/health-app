import React from "react";
import { Maladies } from "./objects/Maladies";
import {Resultats} from "./objects/Resultats";


export const ThemeContext = React.createContext({
    theme: null,
    toggleTheme: () => {}}
);

export const ResultatContext = React.createContext({
    resultat: new Resultats(),
    maladies: new Maladies(),
    resetResultat:() => {},
    setResultat: () => {},
    updateResultatField: () => {},
    updateInDb: () => {},
    calculateMaladies: () => {}
}
);

/* Themes to use in the App */
export const themes = {
    light: {
        background: "#fefefe",
        background_quiz:"#eafaf1"
        
    },
    dark: {
        background: "#030f27",
        background_right:" #34495e",
        background_quiz:" #34495e",
        background_left:"#0e6655",
        textcolor:"#fff",
        textcolorbtn:"black",
        button:"#fff",
        backgroundresult:"white",
        dropdown_border:"black",
        rangeColor:"white",
        rangeToggle:"#77c5a6"

    },
};