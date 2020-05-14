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
  displayRate;
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
      switch (event.key) {
    case 'ArrowDown':
      if (this.seaWorm.getDirection() != Direction.haut) {
        this.seaWorm.setDirection(Direction.bas);
      }
      break;
    case 'ArrowUp':
      if (this.seaWorm.getDirection() != Direction.bas) {
        this.seaWorm.setDirection(Direction.haut);
      }
      break;
    case 'ArrowLeft':
      if (this.seaWorm.getDirection() != Direction.droite) {
        this.seaWorm.setDirection(Direction.gauche);
      }
      break;
    case 'ArrowRight':
      if (this.seaWorm.getDirection() != Direction.gauche) {
        this.seaWorm.setDirection(Direction.droite);
      }
      break;
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
    console.table(this.grid);
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
  }

  displayGame(): void {
    this.displayRate = setInterval(() => {
      const consoleSeaWorm = this.seaWorm.getCases();
      console.log(consoleSeaWorm);
      this.moveWorm(this.seaWorm);
      if (this.food.getCase().getId() == this.seaWorm.getCases()[0].getId()) {
  this.placeFood();
  this.growWorm();
  this.food.setCount(this.food.getCount() + 1);
}
      this.showPixels(this.seaWorm);
/* for (const pixel of this.seaWorm.getCases()) {
for (const pixelToCheck of this.seaWorm.getCases()) {
  if (pixel.getId() == pixelToCheck.getId()) {
  //  this.exitGame();
  }
}
} */
}, 500);
  }

  growWorm(): void {
    const bigWorm = this.seaWorm.getCases();
    let pixelToAdd;
    const lastPixelWorm = this.seaWorm.getCases()[this.seaWorm.getCases().length - 1];
    console.log('seaworm before grow');
    let consoleSeaWorm = this.seaWorm.getCases();
    console.log(consoleSeaWorm);
    if (this.seaWorm.getCases().length > 1) {
      const beforeLastPixelWorm = this.seaWorm.getCases()[this.seaWorm.getCases().length - 2];
      console.log(lastPixelWorm);
      console.log(beforeLastPixelWorm);
      pixelToAdd = new Case(State.worm,
     lastPixelWorm.getPositionX() - (beforeLastPixelWorm.getPositionX() - lastPixelWorm.getPositionX()),
      lastPixelWorm.getPositionY() - (beforeLastPixelWorm.getPositionY() - lastPixelWorm.getPositionY()));
      console.log('pixelToAdd lenght >1');
      console.log(pixelToAdd);
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
      console.log('pixeToAdd length =1');
      console.log(pixelToAdd);
    }
    bigWorm.push(pixelToAdd);
    this.seaWorm.setCases(bigWorm);
    console.log('seaWorm after grow');
    consoleSeaWorm = this.seaWorm.getCases();
    console.log(consoleSeaWorm);
  }


  showPixels(worm: Worm): void {
    let pixelToShow;
    if (this.food.getCount() == 1) {
      console.log('showPixel after food');
      const consoleSeaWorm = this.seaWorm.getCases();
      console.log(consoleSeaWorm);
      }
    for (const pixel of this.grid) {
    pixelToShow = document.getElementById(pixel.getId());
    pixelToShow.style.backgroundColor = 'cornflowerblue';
    if (pixel.getId() == this.food.getCase().getId()) {
      pixelToShow.style.backgroundColor = 'yellowgreen';
    }
  }
    for (const wormPixel of this.seaWorm.getCases()) {
     // console.log('showPixel');
    //  console.log(this.seaWorm);
      pixelToShow = document.getElementById(wormPixel.getId());
  //    console.log(wormPixel.getId());
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
      pixelToMove = new Case (State.worm, positionX, newWormCase.getPositionY());
      break;
    case Direction.droite:
      positionX = newWormCase.getPositionX() + 1;
      pixelToMove = new Case (State.worm, positionX, newWormCase.getPositionY());
      break;
    case Direction.haut:
      positionY = newWormCase.getPositionY() - 1;
      pixelToMove = new Case (State.worm, newWormCase.getPositionX(), positionY);
      break;
    case Direction.bas:
      positionY = newWormCase.getPositionY() + 1;
      pixelToMove = new Case (State.worm, newWormCase.getPositionX(), positionY);
      break;
  }
}

      if (i != 0) {
    newWormCase = wormCases[i - 1];
    pixelToMove = new Case (State.worm, newWormCase.getPositionX(), newWormCase.getPositionY());
}
      newWormCases.push(pixelToMove);
}
    this.seaWorm.setCases(newWormCases);
  }

  exitGame(): void {
  this.clickExitSound.play();
  clearInterval(this.displayRate);
  this.displayParty.emit();
  }

}
