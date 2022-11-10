import { Timestamp } from 'firebase/firestore';
import riskDiabete from '../algo/Diabete';
import riskCancer from '../algo/Cancer';
import riskInfarctus from '../algo/Infarctus';
import correctionAFINF from '../algo/NonInfarctus';
import { Maladies } from './Maladies';


export function calculate(resultat, variables) {
  console.log("variables calculate: ", variables);

  let res = resultat;
  const alcool = res.alcool === 0 ? variables[8].val_normale : res.alcool;
  const afcancer = res.afcancer === 0 ? variables[13].val_normale : res.afcancer;
  const fume = res.fume === 0 ? variables[1].val_normale : res.fume;
  const bmi = res.bmi === 0 ? variables[3].val_normale : res.bmi;
  const sport = res.sport === 0 ? variables[9].val_normale : res.sport;
  const alim = res.alim === 0 ? variables[12].val_normale : res.alim;
  const syst = res.syst === 0 ? variables[7].val_normale : res.syst;
  const diab = res.diab === 0 ? variables[5].val_normale : res.diab;
  const inf = res.inf === 0 ? variables[2].val_normale : res.inf;
  const chol = res.chol === 0 ? variables[10].val_normale : res.inf;
  const hdl = res.hdl === 0 ? variables[6].val_normale : res.hdl;
  const afinf = res.afinf === 0 ? variables[4].val_normale : res.afinf;
  
  let maladies = new Maladies();
  let sumDiab = sumPointDiabete(res);
  maladies.diabete = riskDiabete(sumDiab, res.sexe);
  maladies.cancer = 100 * riskCancer(afcancer,fume,bmi,sport,alcool,alim);

  maladies.infarctus = 100 * riskInfarctus(res.age, res.sexe, fume, syst, diab, inf, chol, hdl);
  maladies.nonInfarctus = 100 * correctionAFINF(res.age, fume, syst, chol, hdl, res.sexe, afinf);
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

export function setBmi(resultat, variables) {
  const res = resultat;

  if (res.poids !== 0 && res.taille !== 0) {
    res.bmi = res.poids / (res.taille / 100 * (res.taille / 100));
  } else {
    res.bmi = variables[3].val_normale;
  }
  return res;
}

export function setSyst(resultat, variables) {
  const res = resultat;

  if (res.yesSyst === 1) {
    console.log("variables[7].val_predefinie ", variables[7].val_predefinie)
    res.syst = variables[7].val_predefinie;
    res.yesSyst = variables[7].val_predefinie;
  } else {
    res.syst = variables[7].val_normale;
  }

  if (res.yesSyst !== 1 && res.yesSyst !== 0) {
    res.syst = res.yesSyst;
  }

  return res;
}

export function setGlyc(resultat, variables) {
  const res = resultat;

  if (res.yesGlyc === 1) {
    res.glyc = variables[0].val_predefinie;
    res.yesGlyc = variables[0].val_predefinie;
  } else {
    res.glyc = variables[0].val_normale;
  }

  if (res.yesGlyc !== 1 && res.yesGlyc !== 0) {
    res.glyc = res.yesGlyc;
  }

  return res;
}
export function setChol(resultat, variables) {
  let res = resultat;

  if (res.yesChol === 1) {
    res.chol = variables[10].val_predefinie;
    res.yesChol = variables[10].val_predefinie;
  } else {
    res.chol = variables[10].val_normale;
  }

  if (res.yesChol !== 1 && res.yesChol !== 0) {
    res.chol = res.yesChol;
  }

  return res;
}

export function setHdl(resultat, variables) {
  let res = resultat;
  console.log("avant res.hdl", res.hdl);
  if (res.yesChol === 1) {
    res.hdl = variables[6].val_predefinie;
    res.yesHdl = variables[6].val_predefinie;
  } 
  
  if(res.yesChol === 0){
    res.hdl = variables[6].val_normale;
  }


  console.log("après res.hdl", res.hdl);
  return res;
}

export class Resultats {
  id_resultats = '';
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
    yesHdl,
    hdl,
    diab,
    fume,
    alim,
    sport,
    alcool,
    taille,
    poids,
    val_predefinie,
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
    this.yesHdl = yesHdl;
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
    if (id === null || id === '') {
      id = Timestamp.fromDate(new Date());
    } else {
      this.id_resultats = id;
    }
  }

  toString() {
    return (
      this.id_resultats +
      ', Diabète : ' +
      this.diabete +
      ', Cancer : ' +
      this.cancer +
      ', Infarctus : ' +
      this.infarctus +
      ', Non-Infarctus : ' +
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
      yesHdl: res.yesHdl,
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
      data.yesHdl,
      data.hdl,
      data.diab,
      data.fume,
      data.alim,
      data.sport,
      data.alcool,
      data.bmi,
      data.taille,
      data.poids,
    );
  }
};
