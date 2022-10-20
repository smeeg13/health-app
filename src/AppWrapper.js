import { BrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import { ThemeContext, ResultatContext } from "./Context";
import { Resultats } from "./objects/Resultats";

class AppWrapper extends React.Component {
  /* Initialize state with a default theme */
  constructor() {
    super();
    this.state = { theme: "light", resultat: new Resultats() };
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
      resultat: { ...prevState.resultat, [name]: value },
    }));
  };

  /*
  Render our App component, + wrapped by a ThemeContext Provider:
  The value contains the theme (coming from state) and the
  toggleTheme method allowing consumers of the context to
  update the current theme.
   */
  render() {
    return (
      <ThemeContext.Provider
        value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
      >
        <ResultatContext.Provider
          value={{
            resultat: this.state.resultat,
            updateResultatField: this.state.updateResultatField,
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
