export class Maladies {
  cancer = 0;
  infarctus = 0;
  nonInfarctus = 0;
  diabete = 0;
  constructor() {
    this.cancer = 0;
    this.infarctus = 0;
    this.nonInfarctus = 0;
    this.diabete = 0;
  }

  toString() {
    return (
      "Cancer : " +
      this.cancer +
      " , Diabete : " +
      this.diabete +
      " , Infarctus : " +
      this.infarctus +
      " , Non-Infarctus : " +
      this.nonInfarctus
    );
  }
}
