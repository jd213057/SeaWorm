import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  image = this.gameService.getBackgroundImg();
  runningParty = false;
  helpRequest = false;
  configRequest = false;
  debugRequest = false;
  scoreRequest = false;
  exitDialog = false;
  onInit = false;
  cursorClass = '';
  clickSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');
  oceanSound = new Audio('.\\assets\\sounds\\OceanTheme.mp3');
  bubbleSound = new Audio('.\\assets\\sounds\\bulles.mp3');
  normalFishSound = new Audio('.\\assets\\sounds\\sonar.mp3');
  backgroundMusic = new Audio(this.getMusic());

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.onInit = true;
    this.playBackgroundSound();
    this.setAnimationBackground();
    this.getNavBarFocus();
    this.activateDebugPanel();
  }

  playBackgroundSound(): void {
    this.clickSound.volume = 0.7;
    this.backgroundMusic.addEventListener('change', function() {
    this.currentTime = 0;
    this.play();
}, false);
    this.oceanSound.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);
    this.bubbleSound.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
  }

  getOceanSound(): string {
    return ".\\assets\\sounds\\OceanTheme.mp3";
  }

  getBubbleSound(): string {
    return ".\\assets\\sounds\\bulles.mp3";
  }

  setAnimationBackground(): void {
    const normalFishImg = document.getElementById('normalFish');
    normalFishImg.addEventListener('click', () => {
      if (this.gameService.getAudio()) {
        this.normalFishSound.play();
      }
    });
    normalFishImg.addEventListener('dblclick', () => {
      if (this.gameService.getAudio()) {
        this.normalFishSound.pause();
      }
    });
  }

  getBackgroundImg(): string {
  return this.gameService.getBackgroundImg();
  }

getAudio(): boolean {
    return !this.gameService.getAudio();
  }

getMusic(): string {
    return this.gameService.getThemeChoice();
  }

getNavBarFocus() {
    const startButton = document.getElementById('start');
    const helpButton = document.getElementById('help');
    const configButton = document.getElementById('config');
    const scoreButton = document.getElementById('score');
    const exitButton = document.getElementById('exit');
    startButton.addEventListener('mouseenter', ( event ) => {
    const e = event.target as HTMLElement;
    e.style.backgroundColor = 'cyan';
    }, false);
    startButton.addEventListener('mouseleave', (event) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = '';
    }, false);
    helpButton.addEventListener('mouseenter', ( event ) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor  = 'cyan';
    }, false);
    helpButton.addEventListener('mouseleave', (event) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = '';
    }, false);
    configButton.addEventListener('mouseenter', ( event ) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor  = 'cyan';
    }, false);
    configButton.addEventListener('mouseleave', (event) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = '';
    }, false);
    scoreButton.addEventListener('mouseenter', ( event ) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor  = 'cyan';
    }, false);
    scoreButton.addEventListener('mouseleave', (event) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = '';
    }, false);
    exitButton.addEventListener('mouseenter', ( event ) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor  = 'cyan';
    }, false);
    exitButton.addEventListener('mouseleave', (event) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = '';
    }, false);
  }

  activateDebugPanel(): void {
    document.body.onkeydown = (e) => {
      if (e.ctrlKey && e.keyCode === 32 &&  this.runningParty == false && this.helpRequest == false &&  this.configRequest == false) {
        if (this.gameService.getAudio()) {
          this.clickSound.play();
        }
        this.debugButton();
      }
          };
  }

startButton()  {
  if (this.gameService.getAudio()) {
    this.clickSound.play();
  }
  this.helpRequest = false;
  this.configRequest = false;
  this.debugRequest = false;
  this.scoreRequest = false;
  this.runningParty = true;
  }

helpButton(): void {
  if (this.gameService.getAudio()) {
    this.clickSound.play();
  }
  this.runningParty = false;
  this.configRequest = false;
  this.debugRequest = false;
  this.scoreRequest = false;
  this.helpRequest = true;
  }

configButton(): void {
  if (this.gameService.getAudio()) {
    this.clickSound.play();
  }
  this.runningParty = false;
  this.helpRequest = false;
  this.debugRequest = false;
  this.scoreRequest = false;
  this.configRequest = true;
  }

debugButton(): void {
  if (this.gameService.getAudio()) {
    this.clickSound.play();
  }
  this.runningParty = false;
  this.helpRequest = false;
  this.configRequest = false;
  this.scoreRequest = false;
  this.debugRequest = !this.debugRequest;
  }

  scoreButton(): void {
    if (this.gameService.getAudio()) {
      this.clickSound.play();
    }
    this.runningParty = false;
    this.helpRequest = false;
    this.configRequest = false;
    this.debugRequest = false;
    this.scoreRequest = true;
  }

displayParty(): void {
    this.runningParty = false;
      }

displayHelp(): void {
    this.helpRequest = false;
  }

displayConfig(): void {
    this.configRequest = false;
  }

displayDebug(): void {
    this.debugRequest = false;
  }

  displayScore(): void {
    this.scoreRequest = false;
  }

displayExitDialog(): void {
  this.exitDialog = false;
}

exitButton() {
  if (this.gameService.getAudio()) {
    this.clickSound.play();
  }
  if (!this.runningParty && !this.helpRequest && !this.configRequest && !this.debugRequest && !this.scoreRequest) {
      this.exitDialog = true;
    }
  this.runningParty = false;
  this.helpRequest = false;
  this.configRequest = false;
  this.scoreRequest = false;
  this.debugRequest = false;
  }

shutdownGame(): void {
  window.close();
}
}
