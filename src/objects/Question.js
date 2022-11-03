export class Question {
  constructor(quId, min, max, question, val_predefined, val_predefined2, valeurs_possibles, typeAnswer,resName, unites) {
    this.min = min;
    this.max = max;
    this.question = question;
    this.val_predefined = val_predefined;
    this.val_predefined2 = val_predefined2;
    this.valeurs_possibles = valeurs_possibles;
    this.typeAnswer = typeAnswer;
    this.resName = resName;
    this.unites = unites;
  }
}

// Firestore data converter
export const questionConverter = {
  toFirestore: (question) => {
    return {
      id: question.id,
      min: question.min,
      max: question.max,
      question: question.question,
      val_predefined: question.val_predefined,
      val_predefined2: question.val_predefined2,
      valeurs_possibles: question.valeurs_possibles,
      typeAnswer: question.typeAnswer,
      resName: question.resName,
      unites: question.unites,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Question(
      snapshot.id,
      data.min,
      data.max,
      data.question,
      data.val_predefined,
      data.val_predefined2,
      data.valeurs_possibles,
      data.typeAnswer,
      data.resName,
      data.unites
      );
  },
};
