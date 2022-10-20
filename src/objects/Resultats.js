import { Timestamp } from "firebase/firestore";
import diabete from "../algo/Diabete";

export class Resultats {
  id_resultats;

  constructor(
    id,
    diabete,
    cancer,
    infarctus,
    nonInfarctus,
    age,
    sexe,
    avc,
    afinf,
    afcancer,
    syst,
    glyc,
    chol,
    hdl,
    diab,
    fume,
    alim,
    sport,
    alcool,
    taille,
    poids
  ) {
    this.setIdResultats(id);
    this.diabete = diabete;
    this.cancer = cancer;
    this.infarctus = infarctus;
    this.nonInfarctus = nonInfarctus;
    this.age = age;
    this.sexe = sexe;
    this.avc = avc;
    this.afinf = afinf;
    this.afcancer = afcancer;
    this.syst = syst;
    this.glyc = glyc;
    this.chol = chol;
    this.hdl = hdl;
    this.diab = diab;
    this.fume = fume;
    this.alim = alim;
    this.sport = sport;
    this.alcool = alcool;
    this.taille = taille;
    this.poids = poids;
    this.bmi = this.poids / ((this.taille / 100) * (this.taille / 100));
  }

  calculate() {
    //TODO:: Check where there's ??
    //this.diabete = Diabete.riskDiabete(??sumDiabete??, this.sexe);
    //this.cancer = Cancer.riskCancer(this.afcancer, this.fume, this.bmi, this.sport, this.alcool, this.alim);
    //this.infarctus = Infarctus.riskInfarctus(this.age, this.sexe,this.fume,this.syst, ??this.dm??, ??this.inf??, this.chol, this.hdl);
    //this.nonInfarctus = NonInfarctus.correctionAFINF(this.age, ??this.nfume??, ??this.nsyst??, ??this.nchol??, ??this.nhdl??, this.sexe, this.afinf);
  }
  setIdResultats(id) {
    if (id === null || id === "") {
      id = Timestamp.fromDate(new Date());
    } else {
      this.id_resultats = id;
    }
  }

  toString() {
    return (
      this.id_resultats +
      ", Diabète : " +
      this.diabete +
      ", Cancer : " +
      this.cancer +
      ", Infarctus : " +
      this.infarctus +
      ", Non-Infarctus : " +
      this.nonInfarctus
    );
  }
}

// Firestore data converter
export const resultatsConverter = {
  toFirestore: (res) => {
    return {
      diabete: res.diabete,
      cancer: res.cancer,
      infarctus: res.infarctus,
      nonInfarctus: res.nonInfarctus,
      age: res.age,
      sexe: res.sexe,
      avc: res.avc,
      afinf: res.afinf,
      afcancer: res.afcancer,
      syst: res.syst,
      glyc: res.glyc,
      chol: res.chol,
      hdl: res.hdl,
      diab: res.diab,
      fume: res.fume,
      alim: res.alim,
      sport: res.sport,
      alcool: res.alcool,
      bmi: res.bmi,
      taille: res.taille,
      poids: res.poids,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Resultats(
      snapshot.id,
      data.diabete,
      data.cancer,
      data.infarctus,
      data.nonInfarctus,
      data.age,
      data.sexe,
      data.avc,
      data.afinf,
      data.afcancer,
      data.syst,
      data.glyc,
      data.chol,
      data.hdl,
      data.diab,
      data.fume,
      data.alim,
      data.sport,
      data.alcool,
      data.bmi,
      data.taille,
      data.poids
    );
  },
};
