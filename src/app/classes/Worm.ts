import { Case } from './Case';

export class Worm {
  cases: Case[];
  direction: Direction;

  constructor(worm: Case[]) {
    this.cases = worm;
    this.direction = Direction.droite;
  }

  getCases(): Case[] {
    return this.cases;
  }

  setCases(worm: Case[]): void {
  this.cases = worm;
  }

  getDirection(): Direction {
    return this.direction.valueOf();
  }

  setDirection(directionWorm): void {
    this.direction = directionWorm;
  }
}

export enum Direction {
  'haut',
  'bas',
  'gauche',
  'droite'
}
