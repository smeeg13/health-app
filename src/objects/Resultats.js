import { Timestamp } from "firebase/firestore";
import riskDiabete from "../algo/Diabete";
import riskCancer from "../algo/Cancer"
import riskInfarctus from "../algo/Infarctus"
import correctionAFINF from "../algo/NonInfarctus"
import { ResultatContext } from "../Context";

export function calculate(props) {//Arondir *100
  //% returned risk
  let sumDiab = sumPointDiabete(props);
  //console.log('sumDiab',sumDiab);
  props.diabete = 100*riskDiabete(sumDiab, props.sexe);

  props.cancer = 100*riskCancer(props.afcancer, props.fume, props.bmi, props.sport, props.alcool, props.alim);
  props.infarctus = 100* riskInfarctus(props.age, props.sexe,props.fume, props.syst, props.diab, props.inf, props.chol, props.hdl);
  props.nonInfarctus = 100*correctionAFINF(props.age, props.fume, props.syst, props.chol, props.hdl, props.sexe, props.afinf);
  //console.log( 'RISK INFARCTUS : ',riskInfarctus(70, 0,0, 110, 0, 0, 3, 2))

  return props;
}


function sumPointDiabete(props) {
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

export class Resultats {
  id_resultats;
  syst =0;
  chol= 0;
  hdl= 0;
  glyc =0;
  diabete=0;
  cancer=0;
  infarctus=0;
  nonInfarctus=0;

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
    this.setSyst(yesSyst);
    this.setGlyc(yesGlyc);
    this.setChol(yesChol);
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

  calculate() {
    //% returned risk
    let sumDiab = this.sumPointDiabete();
    this.diabete = riskDiabete(sumDiab, this.sexe);

    this.cancer = riskCancer(this.afcancer, this.fume, this.bmi, this.sport, this.alcool, this.alim);
    this.infarctus = riskInfarctus(this.age, this.sexe,this.fume, this.syst, this.diab, this.inf, this.chol, this.hdl);
    this.nonInfarctus = correctionAFINF(this.age, this.fume, this.syst, this.chol, this.hdl, this.sexe, this.afinf);
  }

  sumPointDiabete() {
    let pts = 0;
    if (this.age < 45) {
      pts = pts + 1;
    } else if (this.age > 55) {
      pts = pts + 3;
    } else {
      pts = pts + 2;
    }

    if (this.bmi > 20 && this.bmi < 27) {
      pts = pts + 1;
    } else if (this.bmi < 30) {
      pts = pts + 2;
    } else if (this.bmi > 30) {
      pts = pts + 3;
    }

    if (this.syst === 1) {
      pts = pts + 2;
    }

    if (this.glyc === 1) {
      pts = pts + 5;
    }

    pts = pts + this.sport;
    pts = pts + this.alim;

    return pts;
  }

  setBmi() {
    if (this.poids !== 0 && this.taille !== 0) {
      this.bmi = this.poids / ((this.taille / 100) * (this.taille / 100));
    }else{
    this.bmi = 0;
    }
  }

  setSyst(yesSyst) {
    if (yesSyst===1) {
      this.syst = 150 ;
    }else{
      this.syst = 110; //TODO : check si c'est val normale si pas de tension elevée
    }
  }

  setGlyc(yesGlyc) {
    if (yesGlyc===1) {
      this.glyc = 5.6 ;
    }else{
      this.glyc = 5;
    }
  }
  setChol(yesChol) {
    if (yesChol===1) {
      this.chol = 5.9 ;
      this.hdl = 0.9 ;
    }else{
      this.chol = 3;
      this.hdl = 2 ;
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
