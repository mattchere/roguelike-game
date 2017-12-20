import { validLocation, compLoc } from './utils';

const getVisionArray = pLoc => {
  const row = pLoc[0];
  const col = pLoc[1];
  let vision = [];

  // Create locations for the 3x3 box around pLoc
  for (let i=0; i<3; i++) {
    let x = row-1+i;
    for (let j=0; j<3; j++) {
      let y = col-1+j;
      vision.push([x, y]);
    }
  }
  
  // Create locations for the 2 space away extremes
  [-2, 2].forEach(v => {
    for (let i=0; i<3; i++) {
      vision.push([row+v, col-1+i]);
      vision.push([row-1+i, col+v]);
    }
  });

  // Create locations for the 3 space away extremes
  [-3, 3].forEach(v => {
    vision.push([row+v, col]);
    vision.push([row, col+v]);
  });

  return vision.filter(loc => validLocation(loc));
}

const inVision = (vision, location) => (
  vision.filter(l => compLoc(l, location)).length !== 0
);

export {
  getVisionArray,
  inVision,
};