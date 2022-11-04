export class Docteur {
  id_user;
  nom_role = "";
  list_patient = [];
  list_request_patient = [];
  avatar = "";

  constructor(id, email, nom, list_patient, list_request_patient, avatar) {
    this.setId(id);
    this.email = email;
    this.nom = nom;
    this.id_role = "jFC8Tuw87Ic3my6SyOU0";
    this.list_patient = list_patient;
    this.list_request_patient = list_request_patient;
    this.setAvatar(avatar);
  }
  setNomRole(nom_role) {
    this.nom_role = nom_role;
  }
  setAvatar(avatar) {
    if (avatar !== null) {
      this.avatar = avatar;
    } else {
      this.avatar = "/img/avatar1.png";
    }
  }

  setId(id) {
    this.id_user = id;
  }

  toString() {
    return this.nom;
  }
}
export const docteurConverter = {
  toFirestore: (docteur) => {
    return {
      email: docteur.email,
      nom: docteur.nom,
      id_role: docteur.id_role,
      list_patient: docteur.list_patient,
      list_request_patient: docteur.list_request_patient,
      avatar: docteur.avatar,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Docteur(
      snapshot.id,
      data.email,
      data.nom,
      data.list_patient,
      data.list_request_patient,
      data.avatar
    );
  },
};
