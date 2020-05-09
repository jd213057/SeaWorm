import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  @Output() displayParty = new EventEmitter();
  onGame = false;
  clickButton = false;
  clickStartSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');
  clickExitSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');
  buttonClass = 'no-focus';
  compteur = '5';
  displayCountdown = false;
  cardPlayer: string;
  scorePlayer = 0 ;
  manchePlayer = 0;
  cardBot: string;
  scoreBot = 0 ;
  mancheBot = 0;
  equality = false;
  equalitySound = new Audio('.\\assets\\sounds\\SF-ricochet-4.mp3');
  turn =  0;
  displayEndMessage = false;

  constructor(private gameService: GameService) {
   }

  ngOnInit() {
  }

  cursorIn() {
    this.buttonClass = 'cursor-in';
  }

  cursorOut() {
    this.buttonClass = 'no-focus';
  }

  getPlayButtonWording(): string {
    if (this.turn == 0) {
      return 'Commencer';
    }
    return 'Tirer une carte';
  }

  getResultWording(): string {
    return this.manchePlayer > this.mancheBot ? 'GAGNE !!!' : 'PERDU ...';
  }

  getPlayButtonClass(): string {
    if (this.displayCountdown) {
      return 'button-start loading-cursor';
    } else if (this.turn == 0 && !this.displayCountdown) {
      return 'button-start ' + this.buttonClass;
    }
    return 'button-play ' + this.buttonClass;
  }

  getExitButtonClass(): string {
    return 'button-play ' + this.buttonClass;
  }

  displayPlayButton(): boolean {
    if (this.displayCountdown || this.displayEndMessage) {
      return false;
    } else {
      return true;
    }
  }

  displayExitButton(): boolean {
    return this.displayEndMessage ? true : false;
  }

  displayWinFrame(): boolean {
    if (this.manchePlayer >= this.gameService.getNbRound() || this.mancheBot >= this.gameService.getNbRound()) {
      return this.manchePlayer > this.mancheBot ? true : false;
    }
    return false;
  }

  displayLooseFrame(): boolean {
    if (this.manchePlayer >= this.gameService.getNbRound() || this.mancheBot >= this.gameService.getNbRound()) {
      return this.mancheBot > this.manchePlayer ? true : false;
    }
    return false;
  }

  getPanelClass(): string {
  if (this.displayCountdown) {
    return 'loader';
  }
  return '';
  }

  getPlayerInfo(): any {
    if (!this.gameService.getCode2()) {
      if (this.turn == 0) {
        return this.manchePlayer;
      } else if (this.equality == true) {
        return '=';
      }
      return this.scorePlayer;
    } else if (this.gameService.getCode2()) {
      if (this.turn == 0) {
        return this.manchePlayer;
        }
      if (this.turn == 1) {
      return '%';
      }
      return Math.round((((this.scorePlayer) / (this.scorePlayer + this.scoreBot)) * 100)) + '%';
    }
  }

  getBotInfo(): any {
    if (!this.gameService.getCode2()) {
      if (this.turn == 0) {
        return this.mancheBot;
      } else if (this.equality == true) {
        return '=';
      }
      return this.scoreBot;
    } else if (this.gameService.getCode2()) {
        if (this.turn == 0) {
        return this.mancheBot;
        }
        if (this.turn == 1) {
              return '%';
              }
        return Math.round((((this.scoreBot) / (this.scorePlayer + this.scoreBot)) * 100)) + '%';
    }
  }

  countdownTimer(): void {
    let count = 5;
    const preLoadSound = new Audio('.\\assets\\sounds\\SFB-recharge_bullet_02.mp3');
    const loadSound = new Audio( '.\\assets\\sounds\\SFB-arme-pompe.mp3');
    preLoadSound.play();
    const timer = setInterval(() => {
  count--;
  this.compteur = count.toString();
  if (count == 0) {
    this.compteur = 'Go';
    preLoadSound.pause();
    preLoadSound.currentTime = 0;
    loadSound.play();
    setTimeout(() => {
  clearInterval(timer);
  this.displayCountdown = false;
  this.onGame = true;
}, 1000);
  }
}, 1000);
  }

getCount(): string {
  this.compteur = this.compteur;
  return this.compteur;
}

  getPlayerImgSource(): string {
  return '.\\assets\\cards\\' + this.cardPlayer + '.gif';
  }

  getBotImgSource(): string {
    return '.\\assets\\cards\\' + this.cardBot + '.gif';
    }

  playGame(): void {
    this.equality = false;
    if (this.turn == 0) {
      this.clickStartSound.play();
      this.displayCountdown = true;
      this.countdownTimer();
      this.turn++;
      this.cardPlayer = 'Ah';
      this.cardBot = 'As';
      return;
    }
    this.cardPlayer = this.getPlayerCardName();
    this.cardBot = this.getBotCardName();
    this.getWinner();
    if (this.scoreBot >= 10 || this.scorePlayer >= 10) {
      this.scorePlayer >= 10 ? this.manchePlayer++ : this.mancheBot++;
      this.endRound();
  }
    if (this.mancheBot >= this.gameService.getNbRound() || this.manchePlayer >= this.gameService.getNbRound() ) {
    this.endGame();
    return;
  }
  }

  getPlayerCardName(): string {
    let cardValue = (Math.floor(Math.random() * 13) + 1).toString();
    const cardColor = Math.floor(Math.random() * 3);
    if (!this.gameService.getCode1()) {
      switch (cardValue) {
        case '11': cardValue = 'J';
                   break;
        case '12': cardValue = 'Q';
                   break;
        case '13': cardValue = 'K';
                   break;
        case '1': cardValue = 'A';
                  break;
      }
    } else  if (this.gameService.getCode1()) {
        cardValue = 'A';
    }
    switch (cardColor) {
     case 0: return cardValue + 'c';
     case 1: return cardValue + 'd';
     case 2: return cardValue + 'h';
     case 3: return cardValue + 's';
    }
  }

  getBotCardName(): string {
    let cardValue = (Math.floor(Math.random() * 13) + 1).toString();
    const cardColor = Math.floor(Math.random() * 3);
    switch (cardValue) {
        case '11': cardValue = 'J';
                   break;
        case '12': cardValue = 'Q';
                   break;
        case '13': cardValue = 'K';
                   break;
        case '1': cardValue = 'A';
                  break;
      }
    switch (cardColor) {
     case 0: return cardValue + 'c';
     case 1: return cardValue + 'd';
     case 2: return cardValue + 'h';
     case 3: return cardValue + 's';
    }
  }

  getWinner(): void {
    const cardStringPlayer = this.cardPlayer.substr(0, 1);
    const cardStringBot = this.cardBot.substr(0, 1);
    let cardValuePlayer = parseInt(this.cardPlayer.substr(0, 1), 10);
    let cardValueBot = parseInt(this.cardBot.substr(0, 1), 10);
    switch (cardStringPlayer) {
    case '1': cardValuePlayer = 10; break;
    case 'J': cardValuePlayer = 11; break;
    case 'Q': cardValuePlayer = 12; break;
    case 'K': cardValuePlayer = 13; break;
    case 'A': cardValuePlayer = 14; break;
    }
    switch (cardStringBot) {
  case '1': cardValueBot = 10; break;
  case 'J': cardValueBot = 11; break;
  case 'Q': cardValueBot = 12; break;
  case 'K': cardValueBot = 13; break;
  case 'A': cardValueBot = 14; break;
  }
    const buttonSound = new Audio('.\\assets\\sounds\\ButtonClickPoker.mp3');
    buttonSound.play();
    if (cardValuePlayer == cardValueBot) {
      buttonSound.pause();
      buttonSound.currentTime = 0;
      this.equality = true;
      this.equalitySound.play();
      this.turn ++;
      return;
    }
    cardValuePlayer > cardValueBot ? this.scorePlayer ++ : this.scoreBot ++;
    this.turn ++;
  }

  endRound() {
    this.onGame = false;
    this.scorePlayer = 0;
    this.scoreBot = 0;
    this.turn = 0;
    this.compteur = '5';
  }

  endGame(): void {
this.displayEndMessage = true;
  }

  exitGame(): void {
    this.clickExitSound.play();
    this.displayParty.emit();
  }

}
