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
  cursorClassOui = 'no-focus';
  cursorClassNon = 'no-focus';
  cursorClassNoRec = 'no-focus';
  records: Save[];
  displayDsc = true;
  firstClickButton = true;
  displayClearMsg = false;
  displayNoClearMsg = false;
  memoryErased = false;
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

    askClearRecords(): void {
      this.clickSound.play();
      if (localStorage == null ||
        localStorage == undefined ||
        localStorage.getItem('records') == '[]' ||
        this.memoryErased) {
        this.displayNoClearMsg = true;
      } else {
        this.displayClearMsg = true;
      }
    }

    confirmClearRecords(): void {
      this.clickSound.play();
      this.clearRecords();
      this.memoryErased = true;
      this.cursorOutOui();
      this.displayClearMsg = false;
    }

    cancelClearRecords(): void {
      this.clickSound.play();
      this.cursorOutNon();
      this.displayClearMsg = false;
    }

    clearRecords(): void {
      this.gameService.cleanLocalStorage();
      const recordsEmptied: Save[] = [];
      this.gameService.setRecords(recordsEmptied);
      this.records = [];
    }

    okNoRecords(): void {
      this.clickSound.play();
      this.cursorOutNoRec();
      this.displayNoClearMsg = false;
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

    cursorInOui() {
      this.cursorClassOui = 'cursor-dialog-in';
    }

    cursorOutOui() {
      this.cursorClassOui = 'no-focus';
    }

    cursorInNon() {
      this.cursorClassNon = 'cursor-dialog-in';
    }

    cursorOutNon() {
      this.cursorClassNon = 'no-focus';
    }

    cursorInNoRec() {
      this.cursorClassNoRec = 'cursor-dialog-in';
    }

    cursorOutNoRec() {
      this.cursorClassNoRec = 'no-focus';
    }

    exitScore(): void {
      if (this.gameService.getAudio()) {
        this.clickSound.play();
      }
      this.displayScore.emit();
    }
  }
