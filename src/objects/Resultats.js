import { Timestamp } from "firebase/firestore";

export class Resultats {
        id_resultats;
        list_reponses;



    constructor (id,diabete, cancer, infarctus, nonInfarctus,age,sexe,avc,afinf,afcancer,syst,glyc,chol,hdl,fume,alim,sport,alcool,bmi,taille,poids) {
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
        this.fume = fume;
        this.alim = alim;
        this.sport = sport;
        this.alcool = alcool; 
        this.bmi = bmi;
        this.taille = taille;
        this.poids = poids;
    }
    setIdResultats(id){
        if(id === null){
            id = Timestamp.fromDate(new Date());
        }else{
            this.id_resultats = id;
        }
    }
    
    // setListReponses(list){
    //     if(list === null){
    //         list = [];
    //     }else{
    //         this.list_reponses = list;
    //     }
    // }


    toString() {
        return this.id_resultats+ ', Diabète : ' + this.diabete + ', Cancer : ' + this.cancer+ ', Infarctus : ' + this.infarctus+ ', Non-Infarctus : ' + this.nonInfarctus;
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
            list_reponses: res.list_reponses
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Resultats(snapshot.id, data.diabete, data.cancer, data.infarctus, data.nonInfarctus, data.list_reponses);
    }
};

//Diabete infarctus non-infarctus cancer