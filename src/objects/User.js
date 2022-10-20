export class User {
  id_user;
  nom ="";
  age = 0;
  sexe = 0; //1 si masculin, 0 si feminin
  poids = 0;
  taille = 0;
  nom_role='';
  avatar='';


  constructor(id_user,mail, nom, age, sexe, poids, taille) {
    this.setId(id_user);
    this.setEmail(mail);
    this.setNom(nom);
    this.setAge(age);
    this.setSexe(sexe);
    this.setPoids(poids);
    this.setTaille(taille);
    this.id_role = "n5Gejr1pLJrcMagawHqp";
    //+ collections Questionnaires
  }

  setAvatar(avatar){
    //TODO:: manage default avatar
    this.avatar= avatar;
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

  setIdRole(id_role) {
    this.id_role = id_role;
  }

  setAge(age) {
    this.age = age;
  }

  setPoids(poids) {
    this.poids = poids;
  }

  setSexe(sexe) {
    this.sexe = sexe;
  }

  setTaille(taille) {
    this.taille = taille;
  }

  toString() {
    return (
      this.email +
      ", " +
      this.sexe +
      ", " +
      this.age +
      ", " +
      this.poids +
      ", " +
      this.taille
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
      age: user.age,
      sexe: user.sexe,
      poids: user.poids,
      taille: user.taille,
      avatar: user.avatar
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(snapshot.id,data.email,data.nom, data.age, data.sexe, data.poids, data.taille); 
  },
};
