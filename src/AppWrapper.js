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
import { UpdateUserSexe } from "./objects_managers/UserManager";
import { GetTodayDateString } from "./utils/tools";

class AppWrapper extends React.Component {
  /* Initialize state with a default theme */
  emptyRes = new Resultats("",0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

  constructor() {
    super();
    this.state = {
      theme: "light",
      resultat: this.emptyRes,
      maladies: new Maladies(),
    };
  }

  /* Toggle theme method */
  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === "dark" ? "light" : "dark",
    }));
  };

  //Make the Resultat in context Empty
  resetResultat = () => {
    this.setState({
      resultat: this.emptyRes,
      maladies: new Maladies()
    });
    
  };

  //Setting a new Resultat in context  (from historic for example)
  setResultat = (newRes) => {
    this.setState({
      maladies: {
        diabete: newRes.diabete, 
        cancer: newRes.cancer, 
        infarctus: newRes.infarctus, 
        nonInfarctus: newRes.nonInfarctus},
      resultat: {
        id_resultats: newRes.id,
        age: newRes.liste_reponses.age,
        sexe: newRes.liste_reponses.sexe,
        inf: newRes.liste_reponses.inf,
        avc: newRes.liste_reponses.avc,
        afinf: newRes.liste_reponses.afinf,
        afcancer: newRes.liste_reponses.afcancer,
        yesSyst: newRes.liste_reponses.yesSyst,
        yesGlyc: newRes.liste_reponses.yesGlyc,
        yesChol: newRes.liste_reponses.yesChol,
        diab: newRes.liste_reponses.diab,
        fume: newRes.liste_reponses.fume,
        alim: newRes.liste_reponses.alim,
        sport: newRes.liste_reponses.sport,
        alcool: newRes.liste_reponses.alcool,
        taille: newRes.liste_reponses.taille,
        poids: newRes.liste_reponses.poids,  },
    });
  };

  /* update one field of the resultat */
  updateResultatField = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;


    if (target.type === "checkbox") {
      let checkedInt = target.checked === true ? 1 : 0;

      this.setState((prevState) => ({
        resultat: { ...prevState.resultat, [name]: checkedInt },
      }));
    }
    if (target.type === "select-one") {
      this.setState((prevState) => ({
        resultat: { ...prevState.resultat, [name]: parseInt(value) },
      }));
    }
    if (target.type === "range") {
      this.setState((prevState) => ({
        resultat: { ...prevState.resultat, [name]: parseInt(value) },
      }));
    }
    if (target.type === "textbox") {
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
      const dateString = GetTodayDateString();
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

    if (userId === null) {
      //Is a guest
      //Should create a new doc with generated id into Resultat first
      let refDocId;
      refDocId = await CreateDocGuestInResultat();
      await CreateDocResultats(refDocId, resFinal);
    } else {
      //is a user
      await CreateDocResultats(userId, resFinal);
      //Must save the sexe into user too
      await UpdateUserSexe(userId, this.state.resultat.sexe);
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
            resetResultat: this.resetResultat,
            setResultat: this.setResultat,
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
