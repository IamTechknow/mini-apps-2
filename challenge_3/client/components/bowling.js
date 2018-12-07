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
      [this.getCharForPin(1), this.getCharForPin(2), this.getCharForPin(3), this.getCharForPin(4)],
      [this.getCharForPin(5), this.getCharForPin(6), this.getCharForPin(7)],
      [this.getCharForPin(8), this.getCharForPin(9)],
      [this.getCharForPin(10)]
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
