import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Worm, Direction } from '../classes/Worm';
import { Food } from '../classes/Food';
import { Case, State } from '../classes/Case';


@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']
})
export class JeuComponent implements OnInit {
  @Output() displayParty = new EventEmitter();
  grid: Case[] = [];
  seaWorm: Worm;
  food: Food;
  score: number;
  isBitten = false;
  controlPressed = false;
  displayRate;
  wormSpeed = 500;
  clickStartSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');
  clickExitSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');
  buttonClass = 'no-focus';


  constructor() { }

  ngOnInit() {
    this.buildGrid();
    this.setControls();
    this.placeWorm();
    this.placeFood();
    this.displayGame();
  }

  cursorIn() {
    this.buttonClass = 'cursor-in';
  }

  cursorOut() {
    this.buttonClass = 'no-focus';
  }

  getExitButtonClass(): string {
    return ' ' + this.buttonClass;
  }

  getCaseClass(): string {
    return '';
  }

  setControls(): void {
    const grid = document.getElementsByClassName('grid');
    document.addEventListener('keydown', (event) => {
      if (this.controlPressed != true) {
        switch (event.key) {
          case 'ArrowDown':
            if (this.seaWorm.getDirection() != Direction.haut) {
              this.seaWorm.setDirection(Direction.bas);
              this.controlPressed = true;
            }
            break;
          case 'ArrowUp':
            if (this.seaWorm.getDirection() != Direction.bas) {
              this.seaWorm.setDirection(Direction.haut);
              this.controlPressed = true;
            }
            break;
          case 'ArrowLeft':
            if (this.seaWorm.getDirection() != Direction.droite) {
              this.seaWorm.setDirection(Direction.gauche);
              this.controlPressed = true;
            }
            break;
          case 'ArrowRight':
            if (this.seaWorm.getDirection() != Direction.gauche) {
              this.seaWorm.setDirection(Direction.droite);
              this.controlPressed = true;
            }
            break;
        }
      }
  });
}

  buildGrid(): void {
    const caseId = 0;
    for (let y = 0; y <= 9; y++) {
for (let x = 0; x <= 9; x++) {
  const caseToAdd = new Case(State.clear, x, y);
  this.grid.push(caseToAdd);
}
}
  }

  placeWorm(): void {
    const cases = [];
    const pixel = new Case(State.worm, 4, 5);
    cases.push(pixel);
    this.seaWorm = new Worm(cases);
    this.seaWorm.setDirection(Direction.droite);
  }

  placeFood(): void {
    let restart = false;
    let positionX: number;
    let positionY: number;
    do {
      positionX = Math.round(Math.random() * 9);
      positionY = Math.round(Math.random() * 9);
      const idToCheck = positionY.toString() + '-' + positionX.toString();
      for (const pixel of this.seaWorm.getCases()) {
        if (pixel.getId() == idToCheck) {
          restart = true;
        }
      }
    } while (restart == true);
    const foodPixel = new Case(State.food, positionX, positionY);
    this.food = new Food(foodPixel);
    const foodCount = this.food.getCount();
    this.food.setCount(foodCount);
  }

  placeAgainFood(): void {
    let restart = false;
    let positionX: number;
    let positionY: number;
    do {
    restart = false;
    positionX = Math.round(Math.random() * 9);
    positionY = Math.round(Math.random() * 9);
    const idToCheck = positionY.toString() + '-' + positionX.toString();
    for (const pixel of this.seaWorm.getCases()) {
        if (pixel.getId() == idToCheck) {
          restart = true;
        }
    }} while (restart == true);
    this.food.getCase().setPositionX(positionX);
    this.food.getCase().setPositionY(positionY);
    this.food.setCount(this.food.getCount() + 1);
    if (this.food.getCount() % 6 == 0) {
      this.food.setBonus(true);
          }
  }

  displayGame(): void {
    this.displayRate = setInterval(() => {
     this.runGameCycle();
}, this.wormSpeed);
  }

  runGameCycle(): void {
    this.isBitten = this.checkBites();
    if (this.isBitten == false) {
   this.moveWorm(this.seaWorm);
   if (this.food.getCase().getId() == this.seaWorm.getCases()[0].getId()) {
    this.food.getBonus() == true ? this.shrinkWorm() : this.growWorm();
    this.placeAgainFood();

    this.getScore();
    this.increaseWormSpeed();
}
   this.showPixels(this.seaWorm);
  }
  }

  checkBites(): boolean {
    if (this.seaWorm.getCases().length >= 2) {
      const head = this.seaWorm.getCases()[0];
      const restOfBody = this.seaWorm.getCases().slice(1);
      for (const pixel of restOfBody) {
        if (pixel.getPositionX() == head.getPositionX() && pixel.getPositionY() == head.getPositionY()) {
          return true;
        }
      }
    }
    return false;
  }

  getScore(): number {
  return this.food.getCount();
  }

  shrinkWorm(): void {
    const wormShrinked =
     this.seaWorm.getCases().slice(0 , this.seaWorm.getCases().length - 2);
    this.seaWorm.setCases(wormShrinked);
    this.food.setCount(this.food.getCount() + 1);
    this.food.setBonus(false);
  }

  growWorm(): void {
    const bigWorm = this.seaWorm.getCases();
    let pixelToAdd;
    const lastPixelWorm = this.seaWorm.getCases()[this.seaWorm.getCases().length - 1];
    if (this.seaWorm.getCases().length > 1) {
      const beforeLastPixelWorm = this.seaWorm.getCases()[this.seaWorm.getCases().length - 2];
      pixelToAdd = new Case(State.worm,
     lastPixelWorm.getPositionX() - (beforeLastPixelWorm.getPositionX() - lastPixelWorm.getPositionX()),
      lastPixelWorm.getPositionY() - (beforeLastPixelWorm.getPositionY() - lastPixelWorm.getPositionY()));
    } else if (this.seaWorm.getCases().length == 1) {
      let positionX: number;
      let positionY: number;
      switch (this.seaWorm.getDirection()) {
        case Direction.gauche:
positionX = this.seaWorm.getCases()[0].getPositionX() + 1;
positionY = this.seaWorm.getCases()[0].getPositionY();
break;
case Direction.droite:
  positionX = this.seaWorm.getCases()[0].getPositionX() - 1;
  positionY = this.seaWorm.getCases()[0].getPositionY();
  break;
case Direction.haut:
  positionY = this.seaWorm.getCases()[0].getPositionY() + 1;
  positionX = this.seaWorm.getCases()[0].getPositionX();
  break;
case Direction.bas:
  positionY = this.seaWorm.getCases()[0].getPositionY() - 1;
  positionX = this.seaWorm.getCases()[0].getPositionX();
  break;
      }
      pixelToAdd = new Case(State.worm, positionX, positionY);
    }
    bigWorm.push(pixelToAdd);
    this.seaWorm.setCases(bigWorm);
  }


  showPixels(worm: Worm): void {
    let pixelToShow;
    for (const pixel of this.grid) {
    pixelToShow = document.getElementById(pixel.getId());
    pixelToShow.style.backgroundColor = 'cornflowerblue';
    if (pixel.getId() == this.food.getCase().getId()) {
      pixelToShow.style.backgroundColor = this.food.getBonus() == false ? 'yellowgreen' : 'red';
    }
  }
    for (const wormPixel of this.seaWorm.getCases()) {
      pixelToShow = document.getElementById(wormPixel.getId());
      pixelToShow.style.backgroundColor = 'darkblue';
}
  }

  moveWorm(worm: Worm): void {
    const wormCases = worm.getCases();
    const newWormCases: Case[] = [];
    let pixelToMove;
    let positionX;
    let positionY;
    for (let i = 0; i <= wormCases.length - 1; i++) {
      let newWormCase;
      if (i == 0) {
        newWormCase = wormCases[i];
        switch (this.seaWorm.getDirection()) {
    case Direction.gauche:
      positionX = newWormCase.getPositionX() - 1;
      if (positionX <= -1) {
        positionX = 9;
      }
      pixelToMove = new Case (State.worm, positionX, newWormCase.getPositionY());
      break;
    case Direction.droite:
      positionX = newWormCase.getPositionX() + 1;
      if (positionX >= 10) {
        positionX = 0;
      }
      pixelToMove = new Case (State.worm, positionX, newWormCase.getPositionY());
      break;
    case Direction.haut:
      positionY = newWormCase.getPositionY() - 1;
      if (positionY <= -1) {
        positionY = 9;
      }
      pixelToMove = new Case (State.worm, newWormCase.getPositionX(), positionY);
      break;
    case Direction.bas:
      positionY = newWormCase.getPositionY() + 1;
      if (positionY >= 10) {
        positionY = 0;
      }
      pixelToMove = new Case (State.worm, newWormCase.getPositionX(), positionY);
      break;
  }
        this.controlPressed = false;
}
      if (i != 0) {
    newWormCase = wormCases[i - 1];
    pixelToMove = new Case (State.worm, newWormCase.getPositionX(), newWormCase.getPositionY());
}
      newWormCases.push(pixelToMove);
}
    this.seaWorm.setCases(newWormCases);
  }

  increaseWormSpeed(): void {
    this.wormSpeed = this.wormSpeed - 0.5 * this.wormSpeed;
  }

  exitGame(): void {
  this.clickExitSound.play();
  clearInterval(this.displayRate);
  this.displayParty.emit();
  }

}
