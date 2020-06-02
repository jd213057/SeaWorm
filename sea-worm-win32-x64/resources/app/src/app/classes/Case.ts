export class Case {
state: State;
positionX: number;
positionY: number;

constructor(state: State, positionX: number, positionY: number) {
  this.state = state;
  this.positionX = positionX;
  this.positionY = positionY;
}

getPositionX(): number {
  return this.positionX;
}

getPositionY(): number {
  return this.positionY;
}

getId(): string {
return this.positionY.toString() + '-' + this.positionX.toString();
}

setPositionX(positionX: number): void {
  if(positionX <= -1) {
    this.positionX = 9;
  } else if (positionX >= 10) {
    this.positionX = 0;
  } else {
    this.positionX = positionX;
  }
}

setPositionY(positionY: number): void {
  if(positionY <= -1) {
    this.positionY = 9;
  } else if (positionY >= 10) {
    this.positionY = 0;
  } else {
    this.positionY = positionY;
  }
}

getState(): State {
  return this.state.valueOf();
}

setState(state: State) {
  this.state = state;
}
}

export enum State {
  'clear',
  'food',
  'worm'
}
