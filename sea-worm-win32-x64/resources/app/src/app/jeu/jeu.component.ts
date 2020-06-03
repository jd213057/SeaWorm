import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Worm, Direction } from '../classes/Worm';
import { Food } from '../classes/Food';
import { Case, State } from '../classes/Case';
import { GameService } from '../game.service';


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
  compteur = '3';
  onGame = false;
  endGame = false;
  isBitten = false;
  controlPressed = false;
  displayRate;
  wormSpeed = this.gameService.getLevel();
  eatSound = new Audio('.\\assets\\sounds\\eat.mp3');
  clickExitSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');
  buttonClass = 'no-focus';


  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.countdownTimer();
    this.buildGrid();
    this.setControls();
    this.placeWorm();
    this.placeFood();
    this.displayGame();
  }

  ngOnDestroy(): void {
  clearInterval(this.displayRate);
  }

  countdownTimer(): void {
    let count = 3;
    const startSound = new Audio('.\\assets\\sounds\\start-sound.mp3');
    startSound.volume = 0.6;
    startSound.play();
    const timer = setInterval(() => {
  count--;
  this.compteur = count.toString();
  if (count <= 0) {
    this.compteur = 'Go';
    setTimeout(() => {
  clearInterval(timer);
  this.onGame = true;
}, 1000);
  }
}, 1000);
  }

  getCount(): string {
    this.compteur = this.compteur;
    return this.compteur;
  }

  cursorIn() {
    this.buttonClass = 'cursor-in';
  }

  cursorOut() {
    this.buttonClass = 'no-focus';
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
      this.displayRate = setInterval((run) => {
          this.runGameCycle();
     }, this.wormSpeed);
  }

  runGameCycle(): void {
    this.isBitten = this.checkBites();
    if (this.isBitten == false) {
   this.moveWorm(this.seaWorm);
   if (this.food.getCase().getId() == this.seaWorm.getCases()[0].getId()) {
  this.playEatSound();
  this.food.getBonus() == true ? this.shrinkWorm() : this.growWorm();
  this.placeAgainFood();
  this.getScore();
  this.increaseWormSpeed();
}
   this.showPixels(this.seaWorm);
  } else {
    this.storeScore();
    this.looseGame();
  }
  }

  playEatSound(): void {
    this.eatSound.currentTime = 0;
    this.eatSound.play();
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
    if (!this.gameService.getCode1()) {
      this.food.setCount(this.food.getCount() + 1);
    }
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
    if (this.gameService.getCode1()) {
      this.extraGrowWorm();
    }
  }

  extraGrowWorm(): void {
    const bigWorm = this.seaWorm.getCases();
    const lastPixel = bigWorm[bigWorm.length - 1];
    const beforeLastPixelWorm = this.seaWorm.getCases()[this.seaWorm.getCases().length - 2];
    const  pixelToAdd = new Case(State.worm,
      lastPixel.getPositionX() - (beforeLastPixelWorm.getPositionX() - lastPixel.getPositionX()),
      lastPixel.getPositionY() - (beforeLastPixelWorm.getPositionY() - lastPixel.getPositionY()));
    bigWorm.push(pixelToAdd);
    this.seaWorm.setCases(bigWorm);
  }

  showPixels(worm: Worm): void {
    let pixelToShow;
    for (const pixel of this.grid) {
    pixelToShow = document.getElementById(pixel.getId());
    pixelToShow.style.backgroundColor = 'dodgerblue';
    if (pixel.getId() == this.food.getCase().getId()) {
      pixelToShow.style.backgroundColor = this.food.getBonus() == false ? 'yellowgreen' : 'red';
      pixelToShow.style.opacity = 1;
    }
  }
    for (const wormPixel of this.seaWorm.getCases()) {
      pixelToShow = document.getElementById(wormPixel.getId());
      pixelToShow.style.opacity = 1;
      if (!this.gameService.getCode2()) {
        pixelToShow.style.backgroundColor = 'darkblue';
      } else if (this.gameService.getCode2()) {
        const colorRandom = Math.floor(Math.random() * 5);
        switch (colorRandom) {
case 0:
  pixelToShow.style.backgroundColor = 'red';
  break;
case 1:
  pixelToShow.style.backgroundColor = 'orange';
  break;
case 2:
  pixelToShow.style.backgroundColor = 'yellow';
  break;
case 3:
  pixelToShow.style.backgroundColor = 'green';
  break;
case 4:
  pixelToShow.style.backgroundColor = 'darkblue';
  break;
case 5:
  pixelToShow.style.backgroundColor = 'purple';
  break;
        }
      }
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
    this.wormSpeed = this.wormSpeed - 0.05 * this.wormSpeed;
  }

  storeScore(): void {
    let nbRecord = 0;
    if (localStorage.getItem(nbRecord.toString()) !== null) {
      nbRecord = this.gameService.checkLastRecord();
      nbRecord ++;
      }
    const saveDay = new Date();
    const year = saveDay.getUTCFullYear().toString();
    const month = saveDay.getUTCMonth().toString();
    const day = saveDay.getUTCDay().toString();
    const hour = saveDay.getUTCHours().toString();
    const min = saveDay.getUTCMinutes().toString();
    const sec = saveDay.getUTCSeconds().toString();
    const fullDate = year + '/' + month + '/' + day + '-' + hour + ':' + min + ':' + sec;
    const save = {time: fullDate , score:  this.food.getCount().toString()};
    localStorage.removeItem(nbRecord.toString());
    localStorage.setItem(nbRecord.toString(), JSON.stringify(save));
  }

  endPanelClass(): string {
   return this.endGame ? 'end-panel' : '';
  }

  getEndGameClass(): string {
    return this.endGame ? 'score-endGame' : '';
  }

  looseGame(): void {
    const gameOverSound = new Audio ('.\\assets\\sounds\\gameover.mp3');
    gameOverSound.play();
    this.onGame = false;
    this.endGame = true;
    clearInterval(this.displayRate);
    setTimeout(() => {
      this.displayParty.emit();
    }, 10000);
  }

  exitGame(): void {
    this.clickExitSound.volume = 0.7;
    this.clickExitSound.play();
    this.storeScore();
    clearInterval(this.displayRate);
    this.displayParty.emit();
  }

}
