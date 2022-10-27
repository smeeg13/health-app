import { BrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import { ThemeContext, ResultatContext } from "./Context";
import {Resultats,calculate,setBmi, setChol, setGlyc, setSyst} from "./objects/Resultats"

class AppWrapper extends React.Component {
  /* Initialize state with a default theme */
  constructor() {
    super();
    this.state = { theme: "light", resultat: new Resultats('', 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ) };
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


    this.setState((prevState) => ({
      resultat: { ...prevState.resultat, [name]: parseInt(value) },
    }));
  //  let newResult =calculate(this.state.resultat);
  //   this.setState(this.state.resultat);

  };

  calculateRes = (resultat) =>{
    let newResult =  setBmi(resultat);
    newResult =  setSyst(newResult);
    newResult =  setGlyc(newResult);
    newResult =  setChol(newResult);
    let finalRes = calculate(newResult);
    this.setState(finalRes);
  }

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
            updateResultatField: this.updateResultatField,
            updateResultatAll: this.updateResultatAll,
            calculateRes: this.calculateRes,
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
