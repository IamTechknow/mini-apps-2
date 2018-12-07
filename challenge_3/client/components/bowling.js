// Constants
const MAX_FRAMES = 10, MAX_PINS = 10, MAX_ROLLS = 2;

export default class BowlingGame {
  constructor() {
    this.score = undefined;
    this.frame = undefined;
    this.roll = undefined;
    this.pinsUp = undefined;
    this.lastResult = undefined;

    this.reset();
  }

  // Update all of the fields upon a roll
  rollBall(pinsToHit) {
    // Determine if a strike or spare has occurred
    
    // Calculate remaining pins and roll number
    
  }

  isGameDone() {
    return this.frame === MAX_FRAMES && this.roll === MAX_ROLLS;
  }

  getCharForPin(pin) {
    return MAX_PINS - this.pinsUp >= pin ? '*' : 'l' ;
  }

  visualizePins() {
    return [
      [getCharForPin(1), getCharForPin(2), getCharForPin(3), getCharForPin(4)],
      [getCharForPin(5), getCharForPin(6), getCharForPin(7)],
      [getCharForPin(8), getCharForPin(9)],
      [getCharForPin(10)]
    ];
  }

  reset() {
    this.score = 0;
    this.frame = 1;
    this.roll = 1;
    this.pinsUp = MAX_PINS;
    this.lastResult = undefined;
  }
}
