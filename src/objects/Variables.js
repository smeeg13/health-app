export class Variable {
  constructor(
    id_var,
    nom,
    limites,
    val_normale,
    val_predefinie,
  ) {
    this.id_var = id_var;
    this.nom = nom;
    this.limites = limites;
    this.val_normale = val_normale;
    this.val_predefinie = val_predefinie;
  }
  toString() {
    return (
      this.nom +
      ", limites = " +
      this.limites +
      ", val_normale = " +
      this.val_normale +
      ", val_predefinie = " +
      this.val_predefinie 
    );
  }
}

// Firestore data converter
export const variableConverter = {
  toFirestore: (variable) => {
    return {
      nom: variable.nom,
      limites: variable.limites,
      val_normale: variable.val_normale,
      val_predefinie: variable.val_predefinie,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Variable(
      snapshot.id,
      data.nom,
      data.limites,
      data.val_normale,
      data.val_predefinie,
    );
  },
};
