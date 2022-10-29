import { BrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import { ThemeContext, ResultatContext } from "./Context";
import {
  Resultats,
  calculate,
  setBmi,
  setChol,
  setGlyc,
  setSyst,
} from "./objects/Resultats";
import { Maladies } from "./objects/Maladies";

class AppWrapper extends React.Component {
  /* Initialize state with a default theme */
  constructor() {
    super();
    this.state = {
      theme: "light",
      resultat: new Resultats("",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
      maladies: new Maladies(),
    };
  }

  /* Toggle theme method */
  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === "dark" ? "light" : "dark",
    }));
    console.log("Current Theme : ", this.state.theme);
  };

  /* update one field of the resultat */
  updateResultatField = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if(target.type === 'checkbox'){
      let checkedInt = target.checked === true ? 1 : 0;
      
      this.setState((prevState) => ({
        resultat: { ...prevState.resultat, [name]: checkedInt},
      }));
    }   

    if(target.type === 'dropdown'){
      this.setState((prevState) => ({
        resultat: { ...prevState.resultat, [name]: value},
      }));
    }
    if(target.type === 'slider'){
      this.setState((prevState) => ({
        resultat: { ...prevState.resultat, [name]: value},
      }));
    }else{
      this.setState((prevState) => ({
        resultat: { ...prevState.resultat, [name]: parseInt(value) },
      }));
    }
  };

  updateResultatAll = (resultat) => {
    this.setState(resultat);
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
      >
        <ResultatContext.Provider
          value={{
            resultat: this.state.resultat,
            maladies: this.state.maladies,
            updateResultatField: this.updateResultatField,
            updateResultatAll: this.updateResultatAll,
            calculateMaladies: this.calculateMaladies,
          }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ResultatContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

export default AppWrapper;
