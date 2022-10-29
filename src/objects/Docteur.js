export class Docteur {
  id;
  nom_role ="";

  constructor(id, nom,email, list_patient) {
    this.setId(id);
    this.nom = nom;
    this.email = email;
    this.id_role = "jFC8Tuw87Ic3my6SyOU0";

    this.list_patient = list_patient;
  }
  setNomRole(nom_role) {
    this.nom_role = nom_role;
  }

  setId(id) {
    this.id = id;
  }

  toString() {
    return this.nom;
  }
}
export const docteurConverter = {
  toFirestore: (docteur) => {
    return {
      nom: docteur.nom,
      id_role: docteur.id_role,
      list_patient: docteur.list_patient,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Docteur(snapshot.id, data.nom, data.list_patient);
  },
};
