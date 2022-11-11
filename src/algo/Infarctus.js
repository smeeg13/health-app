const coef = [0.0116, 0.2148, 0.1754, 0.0037, 0.2465, 0.3399, 0.4159, -0.2989, -0.0308,-0.0177, 0.0854,];
let [coefAge,coefSex,coefFume,coefSyst,coefDM,coefINF,coefCHOL,coefHDL,coefTotalCHOL,coefeGRF,coefCRP,] = coef;

/**
 * Function to calculate the risk of infarctus based on an excel sheet
 * @param {*} AGE 
 * @param {*} SEXE 
 * @param {*} FUME 
 * @param {*} SYST 
 * @param {*} DM 
 * @param {*} INF 
 * @param {*} CHOL 
 * @param {*} HDL 
 * @returns 
 */
export default function riskInfarctus(AGE, SEXE, FUME, SYST, DM, INF, CHOL, HDL) {
  let res =
    AGE * coefAge +
    SEXE * coefSex +
    FUME * coefFume +
    SYST * coefSyst +
    DM * coefDM +
    INF * coefINF +
    CHOL * coefCHOL +
    HDL * coefHDL +
    0 * coefTotalCHOL +
    120 * coefeGRF +
    Math.log10(0.1) * coefCRP;

  return 1 - Math.pow(0.61785, Math.exp(res - 2.0869));
}
