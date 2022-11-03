export class User {
  id_user;
  nom = "";
  sexe = 0; //0 si masculin, 1 si feminin
  nom_role = "";
  avatar = "avatar1.png";
  docteur_requested = "";
  docteur_assigned = "";

  constructor(
    id_user,
    mail,
    nom,
    sexe,
    id_role,
    isAdmin,avatar,
    doc_ass,
    doc_req
  ) {
    this.setId(id_user);
    this.setEmail(mail);
    this.setNom(nom);
    this.setSexe(sexe);
    this.setIdRole(id_role, isAdmin);
    this.setAvatar(avatar);
    this.docteur_assigned = doc_ass;
    this.docteur_requested = doc_req; //+ collections Questionnaires
  }

  setAvatar(avatar) {
    if (avatar !== null) {
      this.avatar = avatar;
    } else {
      if ((this.sexe = 0)) {
        this.avatar = "/img/avatar1.png";
      } else {
        this.avatar = "/img/avatar6.png";
      }
    }
  }

  setId(id) {
    this.id_user = id;
  }

  setEmail(mail) {
    this.email = mail;
  }

  setNom(nom) {
    this.nom = nom;
  }

  setNomRole(nom_role) {
    this.nom_role = nom_role;
  }

  setIdRole(id_role, isAdmin) {
    if (id_role !== null) {
      this.id_role = id_role;
    } else if (isAdmin === true && isAdmin !== null) {
      this.id_role = "Rok7J6Y8zqnKCAJf4U85";
    } else {
      this.id_role = "n5Gejr1pLJrcMagawHqp";
    }
  }

   setSexe(sexe) {
    this.sexe = sexe;
  }

  toString() {
    return (
      this.email +
      ", " +
      this.sexe +
      ", " +
      this.avatar
    );
  }
}

// Firestore data converter
export const userConverter = {
  toFirestore: (user) => {
    return {
      nom: user.nom,
      email: user.email,
      id_role: user.id_role,
      sexe: user.sexe,
      avatar: user.avatar,
      docteur_requested: user.docteur_requested,
      docteur_assigned: user.docteur_assigned,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(
      snapshot.id,
      data.email,
      data.nom,
      data.sexe,
      data.id_role,
      null,
      data.avatar,
      data.docteur_assigned,
      data.docteur_requested
    );
  },
};
