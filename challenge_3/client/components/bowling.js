// Constants
const MAX_FRAMES = 10, MAX_PINS = 10, MAX_ROLLS = 2;
const STRIKE = 10, SPARE = 11, OPEN = 12;

export default class BowlingGame {
  constructor() {
    this.score = undefined;
    this.frame = undefined;
    this.roll = undefined;
    this.pinsUp = undefined;
    this.lastResult = undefined;
    
    // TODO: Keep track of strikes and spares

    this.reset();
  }

  // Update all of the fields upon a roll
  rollBall(pinsToHit) {
    this.pinsUp -= pinsToHit;
    // Determine if a strike or spare has occurred
    if (this.roll === 1 && this.pinsUp === 0) {
      this.lastResult = STRIKE;
    } else if (this.roll === 2 && this.pinsUp === 0) {
      this.lastResult = SPARE;
    } else if (this.roll === 2 && this.pinsUp >= 0){
      this.lastResult = OPEN;
    } else {
      this.lastResult = pinsToHit;
    }
    
    // Calculate score
    this.score += pinsToHit;
    
    // TODO: Strikes and spares
    
    // Calculate frame or roll number
    if (this.lastResult >= STRIKE) {
      this.frame += 1;
      this.roll = 1;
      this.pinsUp = MAX_PINS;
    } else {
      this.roll += 1;
    }
  }

  isGameDone() {
    return this.frame > MAX_FRAMES;
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
