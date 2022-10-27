import { Timestamp } from "firebase/firestore";
import riskDiabete from "../algo/Diabete";
import riskCancer from "../algo/Cancer";
import riskInfarctus from "../algo/Infarctus";
import correctionAFINF from "../algo/NonInfarctus";

export function calculate(props) {
  //Arondir *100
  //% returned risk
 let res = props;
  let sumDiab = sumPointDiabete(res);
  res.diabete = 100 *  riskDiabete(sumDiab, res.sexe);

  res.cancer = 100 *riskCancer(
    res.afcancer,
    res.fume,
    res.bmi,
    res.sport,
    res.alcool,
    res.alim
  );
  res.infarctus =
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
    res.nonInfarctus = 100 *correctionAFINF(
      res.age,
      res.fume,
      res.syst,
      res.chol,
      res.hdl,
      res.sexe,
      res.afinf
  );
  return res;
}

export function sumPointDiabete(props) {
  let pts = 0;
  if (props.age < 45) {
    pts = pts + 1;
  } else if (props.age > 55) {
    pts = pts + 3;
  } else {
    pts = pts + 2;
  }

  if (props.bmi > 20 && props.bmi < 27) {
    pts = pts + 1;
  } else if (props.bmi < 30) {
    pts = pts + 2;
  } else if (props.bmi > 30) {
    pts = pts + 3;
  }

  if (props.syst === 1) {
    pts = pts + 2;
  }

  if (props.glyc === 1) {
    pts = pts + 5;
  }

  pts = pts + props.sport;
  pts = pts + props.alim;

  return pts;
}

export function setBmi(props) {
  let res = props;
  if (res.poids !== 0 && res.taille !== 0) {
    res.bmi = res.poids / ((res.taille / 100) * (res.taille / 100));
  } else {
    res.bmi = 0;
  }
  return res;

}

export function setSyst(props) {
  let res = props;

  if (res.yesSyst === 1) {
    res.syst = 150;
  } else {
    res.syst = 110; //TODO : check si c'est val normale si pas de tension elevée
  }
  return res;

}

export function setGlyc(props) {
  let res = props;

  if (res.yesGlyc === 1) {
    res.glyc = 5.6;
  } else {
    res.glyc = 5;
  }
  return res;
}
export function setChol(props) {
  let res = props;

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
  id_resultats;
  syst = 0;
  chol = 0;
  hdl = 0;
  glyc = 0;
  diabete = 0;
  cancer = 0;
  infarctus = 0;
  nonInfarctus = 0;

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
    diab,
    fume,
    alim,
    sport,
    alcool,
    taille,
    poids
  ) {
    this.setIdResultats(id);
    this.age = age;
    this.sexe = sexe;
    this.inf = inf;
    this.avc = avc;
    this.afinf = afinf;
    this.afcancer = afcancer;
    this.yesSyst = yesSyst;
    this.yesGlyc = yesGlyc;
    this.yesChol = yesChol;
    this.diab = diab; //DM dans excel
    this.fume = fume;
    this.alim = alim; //score
    this.sport = sport; //score
    this.alcool = alcool; //score
    this.taille = taille;
    this.poids = poids;
    this.setBmi(this.poids, this.taille);
    //this.calculate();
  }

  setBmi() {
    if (this.poids !== 0 && this.taille !== 0) {
      this.bmi = this.poids / ((this.taille / 100) * (this.taille / 100));
    } else {
      this.bmi = 0;
    }
  }

  setSyst(yesSyst) {
    if (yesSyst === 1) {
      this.syst = 150;
    } else {
      this.syst = 110; //TODO : check si c'est val normale si pas de tension elevée
    }
  }

  setGlyc(yesGlyc) {
    if (yesGlyc === 1) {
      this.glyc = 5.6;
    } else {
      this.glyc = 5;
    }
  }
  setChol(yesChol) {
    if (yesChol === 1) {
      this.chol = 5.9;
      this.hdl = 0.9;
    } else {
      this.chol = 3;
      this.hdl = 2;
    }
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
