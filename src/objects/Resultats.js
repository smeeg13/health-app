import { Timestamp } from "firebase/firestore";
import riskDiabete from "../algo/Diabete";
import riskCancer from "../algo/Cancer";
import riskInfarctus from "../algo/Infarctus";
import correctionAFINF from "../algo/NonInfarctus";
import { Maladies } from "./Maladies";

export function calculate(resultat) {
  //Arondir *100
  //% returned risk
 let res = resultat;
 let maladies = new Maladies();
  let sumDiab = sumPointDiabete(res);
  maladies.diabete =   riskDiabete(sumDiab, res.sexe);

  maladies.cancer = 100 *riskCancer(
    res.afcancer,
    res.fume,
    res.bmi,
    res.sport,
    res.alcool,
    res.alim
  );
  maladies.infarctus =
    100 *
    riskInfarctus(
      res.age,
      res.sexe,
      res.fume,
      res.syst,
      res.diab,
      res.inf,
      res.chol,
      res.hdl
    );
    maladies.nonInfarctus = 100 *correctionAFINF(
      res.age,
      res.fume,
      res.syst,
      res.chol,
      res.hdl,
      res.sexe,
      res.afinf
  );
  return maladies;
}

export function sumPointDiabete(resultat) {
  let pts = 0;
  if (resultat.age < 45) {
    pts = pts + 1;
  } else if (resultat.age > 55) {
    pts = pts + 3;
  } else {
    pts = pts + 2;
  }

  if (resultat.bmi > 20 && resultat.bmi < 27) {
    pts = pts + 1;
  } else if (resultat.bmi < 30) {
    pts = pts + 2;
  } else if (resultat.bmi > 30) {
    pts = pts + 3;
  }

  if (resultat.syst === 1) {
    pts = pts + 2;
  }

  if (resultat.glyc === 1) {
    pts = pts + 5;
  }

  pts = pts + resultat.sport;
  pts = pts + resultat.alim;

  return pts;
}

export function setBmi(resultat) {
  let res = resultat;
  if (res.poids !== 0 && res.taille !== 0) {
    res.bmi = res.poids / ((res.taille / 100) * (res.taille / 100));
  } else {
    res.bmi = 0;
  }
  return res;

}

export function setSyst(resultat) {
  let res = resultat;
  
  if (res.yesSyst === 1) {
    res.syst = 150;
  } else {
    res.syst = 110; //TODO : check si c'est val normale si pas de tension elevée
  }
  return res;

}

export function setGlyc(resultat) {
  let res = resultat;

  if (res.yesGlyc === 1) {
    res.glyc = 5.6;
  } else {
    res.glyc = 5;
  }
  return res;
}
export function setChol(resultat) {
  let res = resultat;

  if (res.yesChol === 1) {
    res.chol = 5.9;
    res.hdl = 0.9;
  } else {
    res.chol = 3;
    res.hdl = 2;
  }
  return res;
}


export class Resultats {
  id_resultats='';
  syst = 0;
  chol = 0;
  hdl = 0;
  glyc = 0;
  

  constructor(
    id,
    age,
    sexe,
    inf,
    avc,
    afinf,
    afcancer,
    yesSyst,
    yesGlyc,
    yesChol,
    hdl,
    diab,
    fume,
    alim,
    sport,
    alcool,
    taille,
    poids
  ) {
    this.id_resultats = id;
    this.age = age;
    this.sexe = sexe;
    this.inf = inf;
    this.avc = avc;
    this.afinf = afinf;
    this.afcancer = afcancer;
    this.yesSyst = yesSyst;
    this.yesGlyc = yesGlyc;
    this.yesChol = yesChol;
    this.hdl = hdl;
    this.diab = diab; //DM dans excel
    this.fume = fume;
    this.alim = alim; //score
    this.sport = sport; //score
    this.alcool = alcool; //score
    this.taille = taille;
    this.poids = poids;

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
      yesSyst: res.yesSyst,
      yesGlyc: res.yesGlyc,
      yesChol: res.yesChol,
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
      data.age,
      data.sexe,
      data.inf,
      data.avc,
      data.afinf,
      data.afcancer,
      data.yesSyst,
      data.yeyGlyc,
      data.yesChol,
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
