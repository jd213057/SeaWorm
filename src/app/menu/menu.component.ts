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
  exitDialog= false;
  onInit = false;
  cursorClass = '';
  clickSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.onInit = true;
    this.getNavBarFocus();
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

cursorIn() {
    this.cursorClass = '';
  }

cursorOut() {
    this.cursorClass = 'cursor-out';
  }

getNavBarFocus() {
    const startButton = document.getElementById('start');
    const helpButton = document.getElementById('help');
    const configButton = document.getElementById('config');
    const debugButton = document.getElementById('debug');
    const exitButton = document.getElementById('exit');
    startButton.addEventListener('mouseenter', ( event ) => {
    const e = event.target as HTMLElement;
    e.style.backgroundColor = 'lightslategray';
    }, false);
    startButton.addEventListener('mouseleave', (event) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = '';
    }, false);
    helpButton.addEventListener('mouseenter', ( event ) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor  = 'lightslategray';
    }, false);
    helpButton.addEventListener('mouseleave', (event) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = '';
    }, false);
    configButton.addEventListener('mouseenter', ( event ) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor  = 'lightslategray';
    }, false);
    configButton.addEventListener('mouseleave', (event) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = '';
    }, false);
    debugButton.addEventListener('mouseenter', ( event ) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor  = 'lightslategray';
    }, false);
    debugButton.addEventListener('mouseleave', (event) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = '';
    }, false);
    exitButton.addEventListener('mouseenter', ( event ) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor  = 'lightslategray';
    }, false);
    exitButton.addEventListener('mouseleave', (event) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = '';
    }, false);
  }

startButton()  {
    this.clickSound.play();
    this.helpRequest = false;
    this.configRequest = false;
    this.debugRequest = false;
    this.runningParty = true;
  }

helpButton(): void {
    this.clickSound.play();
    this.runningParty = false;
    this.configRequest = false;
    this.debugRequest = false;
    this.helpRequest = true;
  }

configButton(): void {
    this.clickSound.play();
    this.runningParty = false;
    this.helpRequest = false;
    this.debugRequest = false;
    this.configRequest = true;
  }

debugButton(): void {
    this.clickSound.play();
    this.runningParty = false;
    this.helpRequest = false;
    this.configRequest = false;
    this.debugRequest = true;
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

displayExitDialog(): void {
  this.exitDialog = false;
}

exitButton() {
    this.clickSound.play();
    if (!this.runningParty && !this.helpRequest && !this.configRequest && !this.debugRequest) {
      this.exitDialog = true;
    }
    this.runningParty = false;
    this.helpRequest = false;
    this.configRequest = false;
    this.debugRequest = false;
  }

shutdownGame(): void {
  window.close();
}
}
