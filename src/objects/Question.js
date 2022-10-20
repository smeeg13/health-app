
export class Question {
    constructor (quId,min, max,question,val_predefined,val_predefined2,typeAnswer) {
        this.min = min;
        this.max = max;
        this.question = question;
        this.val_predefined = val_predefined;
        this.val_predefined2 = val_predefined2;
        this.typeAnswer = typeAnswer;
    }
}

// Firestore data converter
export const questionConverter = {
    toFirestore: (question) => {
        return {
            id:question.id,
            min: question.min,
            max: question.max,
            question: question.question,
            val_predefined: question.val_predefined,
            val_predefined2: question.val_predefined2,
            typeAnswer: question.typeAnswer,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Question(snapshot.id,data.min,data.max,data.question,data.val_predefined,data.val_predefined2,data.typeAnswer);
    }
};