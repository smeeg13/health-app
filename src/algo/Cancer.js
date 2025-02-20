
const coefCancer = [1, 1, 0.5, 0.5, 0.5, 0.5];
const baseRisk = 0.09;
let [coefAFCANCER, coefFUME, coefBMI, coefSPORT, coefALCOOL, coefALIM] =
  coefCancer;

const sumCoef = coefCancer.reduce(
  (previousValue, currentValue) => previousValue + currentValue
);

/**
 * Function to calculate the risk of cancer
 * @param {*} AFCANCER 
 * @param {*} FUME 
 * @param {*} BMI 
 * @param {*} SPORT 
 * @param {*} ALCOOL 
 * @param {*} ALIM 
 * @returns 
 */

export default function riskCancer(AFCANCER, FUME, BMI, SPORT, ALCOOL, ALIM) {
  let sommeFinal =  sommeCancer(AFCANCER, FUME, BMI, SPORT, ALCOOL, ALIM) + baseRisk;
  return sommeFinal < 0 ? 0 : sommeFinal;
}

function sommeCancer(AFCANCER, FUME, BMI, SPORT, ALCOOL, ALIM) {
  return (
    calculAFCANCER(AFCANCER) +
    calculFUME(FUME) +
    calculBMI(BMI) +
    calculSPORT(SPORT) +
    calculALCOOL(ALCOOL) +
    calculALIM(ALIM)
  );
}

function calculAFCANCER(AFCANCER) {
  return (AFCANCER * coefAFCANCER) / sumCoef;
}

function calculFUME(FUME) {
  return (FUME * coefFUME) / sumCoef;
}

function calculBMI(BMI) {
  return (((BMI - 25) / 10) * coefBMI) / sumCoef;
}

function calculSPORT(SPORT) {
  return ((SPORT / 3) * coefSPORT) / sumCoef;
}

function calculALCOOL(ALCOOL) {
  return ((ALCOOL / 4) * coefALCOOL) / sumCoef;
}

function calculALIM(ALIM) {
  return ((ALIM / 3) * coefALIM) / sumCoef;
}
