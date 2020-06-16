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

  getPanelClass(): string {
    if (this.step == 3) {
      return ' ' + 'last-panel';
    }
    return '';
  }

  getPanelTextClass(): string {
    if (this.step == 3) {
      return ' ' + 'last-panel-text';
    }
    return '';
  }

  getMainTitleWording(): string {
    if (this.step < 3) {
      return "Mode d'emploi";
    }
    return 'Exemple video';
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

  getHelpButtonWording(): string {
    if (this.step == 0 || this.step == 1 || this.step == 2) {
      return 'Suivant';
    }
    return "J'ai compris !";
  }

  getHelpButtonClass(): string {
  return this.step == 0 ||  this.step == 1 || this.step == 2 ? this.cursorClass + ' button-next' : this.cursorClass + ' ' + 'last-button';
  }

  clickHelpButton(): void {
    this.clickSound.volume = 0.7;
    if (this.gameService.getAudio()) {
      this.clickSound.play();
    }
    if (this.step == 3) {
      this.displayHelp.emit();
    }
    this.step ++;
  }


}

