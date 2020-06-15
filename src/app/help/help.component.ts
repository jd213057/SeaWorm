import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
@Output() displayHelp = new EventEmitter();
cursorClass = 'no-focus';
step = 0;
clickSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');

  constructor(protected gameService: GameService) { }

  ngOnInit() {
  }

  cursorIn() {
    this.cursorClass = 'cursor-in';
  }

  cursorOut() {
    this.cursorClass = 'no-focus';
  }

  getTitleWording() : string {
    if (this.step == 0) {
      return 'But du jeu :';
    } else if (this.step == 1) {
      return 'Type de Nourriture:';
    } else if (this.step == 2) {
      return 'Type de Nourriture (suite):';
    }
  }

  getTextWording(): string {
    if (this.step == 0) {
      return 'Dans SeaWorm, vous contrôlez un vers marin à la recherche de nourriture.\n' +
      'Plus vous attraperez de nourriture, plus vous grandirez.\n' +
      'Le but du jeu est de trouver un maximum de nourriture sans vous mordre la queue!\n' +
      'Y arriverez-vous ?';
    } else if (this.step == 1) {
      return 'Jaune :  +1pt, +1px\n' + '\n' +
      'Rouge : +2pts, -1px\n' +
      'Violette : +3pts, -2px\n';
    } else if (this.step == 2) {
      return 'Bleu : +3pts, -2px, apparait durant 3s\n' +
      'Orange : +1pt, le SeaWorm grandit tant qu’il n’a pas mangé la nourriture.\n' +
       'Verte : +100pts, le SeaWorm est réduit à 1px';
    }
    }

  getHelpButtonWording(): string {
    if (this.step == 0 || this.step == 1) {
      return 'Suivant';
    }
    return "J'ai compris !";
  }

  getHelpButtonClass(): string {
  return this.step == 0 ||  this.step == 1 ? this.cursorClass + ' button-next' : this.cursorClass;
  }

  clickHelpButton(): void {
    this.clickSound.volume = 0.7;
    if (this.gameService.getAudio()) {
      this.clickSound.play();
    }
    if (this.step == 2) {
      this.displayHelp.emit();
    }
    this.step ++;
  }


}

