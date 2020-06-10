import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Save } from '../classes/Save';
import { GameService } from '../game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Output() displayScore = new EventEmitter();
  cursorClass = 'no-focus';
  cursorClassClear = 'no-focus';
  cursorClassOk = 'no-focus';
  records: Save[];
  displayDsc = true;
  firstClickButton = true;
  clickSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');

    constructor(public gameService: GameService) {
      this.clickSound.volume = 0.7;
    }

    ngOnInit() {
      this.records = this.getRecordList();
    }

    getRecordList() {
      this.records = JSON.parse(localStorage.getItem('records'));
      return  this.records;
    }

    getRecordListSortedAsc(): void {
      if (this.gameService.getAudio()) {
        this.clickSound.play();
      }
      this.displayDsc = !this.displayDsc;
      this.records =  this.gameService.getRecordListSortedAsc();
    }

    getRecordListSortedDsc(): void {
      if (this.gameService.getAudio()) {
        this.clickSound.play();
      }
      this.displayDsc = !this.displayDsc;
      this.records = this.gameService.getRecordListSortedDsc();
      if (this.firstClickButton) {
        this.firstClickButton = false;
      }
    }

    clearRecords(): void {
      this.clickSound.play();
      this.gameService.cleanLocalStorage();
      this.records = [];
    }

    cursorIn() {
      this.cursorClass = 'cursor-in';
    }

    cursorOut() {
      this.cursorClass = 'no-focus';
    }

    cursorInClear() {
      this.cursorClassClear = 'cursor-in';
    }

    cursorOutClear() {
      this.cursorClassClear = 'no-focus';
    }

    cursorInOk() {
      this.cursorClassOk = 'cursor-in';
    }

    cursorOutOk() {
      this.cursorClassOk = 'no-focus';
    }

    exitScore(): void {
      if (this.gameService.getAudio()) {
        this.clickSound.play();
      }
      this.displayScore.emit();
    }
  }