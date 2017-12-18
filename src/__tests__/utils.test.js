import {
  compLoc,
} from '../game_logic/utils';

describe('compLoc', () => {
  it('should be true if locations are the same', () => {
    expect(compLoc([0,0], [0,0])).toBe(true);
  });
  it('should be false if locations are different', () => {
    expect(compLoc([0,1], [0,0])).toBe(false);
  });
});