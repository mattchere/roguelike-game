import { getVisionArray, inVision } from '../game_logic/vision';

describe('VISION FUNCTIONS', () => {
  describe('getVisionArray', () => {
    
    const middle = getVisionArray([10, 15]);
    const corner = getVisionArray([0, 0]);
    const side = getVisionArray([10, 0]);

    it('should return an array of locations', () => {
      expect(middle).toBeInstanceOf(Array);
      expect(middle[0]).toBeInstanceOf(Array);
    });
    it('should return the correct number of locations', () => {
      expect(middle.length).toBe(25);
      expect(corner.length).toBe(10);
      expect(side.length).toBe(16);
    });
    it('should return locations three spaces away from the player', () => {
      const expectedMiddle = [
                                   [ 7,15],
                          [ 8,14], [ 8,15], [ 8,16],
                 [ 9,13], [ 9,14], [ 9,15], [ 9,16], [ 9,17],
        [10,12], [10,13], [10,14], [10,15], [10,16], [10,17], [10,18],
                 [11,13], [11,14], [11,15], [11,16], [11,17],
                          [12,14], [12,15], [12,16],
                                   [13,15],
      ];

      const expectedCorner = [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1],
        [3, 0],
      ];

      const expectedSide = [
        [ 7, 0],
        [ 8, 0], [ 8, 1],
        [ 9, 0], [ 9, 1], [ 9, 2],
        [10, 0], [10, 1], [10, 2], [10, 3],
        [11, 0], [11, 1], [11, 2],
        [12, 0], [12, 1],
        [13, 0],
      ];

      expect(middle).toEqual(expect.arrayContaining(expectedMiddle));
      expect(corner).toEqual(expect.arrayContaining(expectedCorner));
      expect(side).toEqual(expect.arrayContaining(expectedSide));
    });
  });

  describe('inVision', () => {
    const vision = getVisionArray([10, 15]);
    const shown = [10, 15];
    const hidden = [0, 0];

    it('should return true if given location is in vision', () => {
      expect(inVision(vision, shown)).toBeTruthy();
    });
    it('should return false if given location is not in vision', () => {
      expect(inVision(vision, hidden)).toBeFalsy();
    });
  });
});