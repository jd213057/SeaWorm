import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from 'sea-worm-win32-x64/resources/app/src/app/game.service';
import { Save } from '../classes/Save';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Output() displayScore = new EventEmitter();
  cursorClass = 'no-focus';
  records: Save[];
  clickSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');

    constructor(public gameService: GameService) {}

    ngOnInit() {
      this.records = this.getRecordList();
    }

    getRecordList() {
      this.records = JSON.parse(localStorage.getItem('records'));
      return  this.records;
    }

    cursorIn() {
      this.cursorClass = 'cursor-in';
    }

    cursorOut() {
      this.cursorClass = 'no-focus';
    }

    exitHelp(): void {
      this.clickSound.volume = 0.7;
      this.clickSound.play();
      this.displayScore.emit();
    }
  }
