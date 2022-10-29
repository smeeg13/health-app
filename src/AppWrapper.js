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
import {
  CreateDocGuestInResultat,
  CreateDocResultats,
} from "./objects_managers/ResultatsManager";
import { Timestamp } from "firebase/firestore";

class AppWrapper extends React.Component {
  /* Initialize state with a default theme */
  constructor() {
    super();
    this.state = {
      theme: "light",
      resultat: new Resultats(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
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

  calculateMaladies = (resultat) => {
    let newResult = setBmi(resultat);
    newResult = setSyst(newResult);
    newResult = setGlyc(newResult);
    newResult = setChol(newResult);
    let newMaladies = new Maladies();
    newMaladies = calculate(newResult);
    this.setState(() => ({
      maladies: {
        cancer: newMaladies.cancer,
        diabete: newMaladies.diabete,
        infarctus: newMaladies.infarctus,
        nonInfarctus: newMaladies.nonInfarctus,
      },
    }));
  };

  updateInDb = async (userId) => {
    //Take back all info of Resultat And maladie
    if (this.state.resultat.id_resultats === "") {
      const currentDate = new Date();

      const currentDayOfMonth = currentDate.getDate();
      const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
      const currentYear = currentDate.getFullYear();

      const dateString =
        currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
      this.state.resultat.id_resultats = dateString;
    }
    const resFinal = {
      id: this.state.resultat.id_resultats,
      cancer: this.state.maladies.cancer,
      diabete: this.state.maladies.diabete,
      infarctus: this.state.maladies.infarctus,
      nonInfarctus: this.state.maladies.nonInfarctus,
      liste_reponses: {
        age: this.state.resultat.age,
        sexe: this.state.resultat.sexe,
        inf: this.state.resultat.inf,
        avc: this.state.resultat.avc,
        afinf: this.state.resultat.afinf,
        afcancer: this.state.resultat.afcancer,
        yesSyst: this.state.resultat.yesSyst,
        yesGlyc: this.state.resultat.yesGlyc,
        yesChol: this.state.resultat.yesChol,
        diab: this.state.resultat.diab,
        fume: this.state.resultat.fume,
        alim: this.state.resultat.alim,
        sport: this.state.resultat.sport,
        alcool: this.state.resultat.alcool,
        taille: this.state.resultat.taille,
        poids: this.state.resultat.poids,
      },
    };
    console.log("Final Data for Resultat : ", resFinal);

    if (userId === null) {
      //Is a guest
      //Should create a new doc with generated id into Resultat first
      let refDocId;
      refDocId = await CreateDocGuestInResultat();
      //await CreateDocResultats(refDocId, resFinal);
    } else {
      //is a user
      //Should retrieve the doc into Resultat with the id of user
      await CreateDocResultats(userId, resFinal);
    }
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
            updateInDb: this.updateInDb,
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
