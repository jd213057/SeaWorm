import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-exit-dialog',
  templateUrl: './exit-dialog.component.html',
  styleUrls: ['./exit-dialog.component.css']
})
export class ExitDialogComponent implements OnInit {
@Output() displayExitDialog = new EventEmitter();
@Output() displayExitGame = new EventEmitter();
cursorExitClass = '';
cursorCancelClass = '';
clickSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');

  constructor() { }

  ngOnInit() {
  }

  cursorExitIn() {
    this.cursorExitClass = 'cursor-in';
  }

  cursorExitOut() {
    this.cursorExitClass = 'no-focus';
  }

  cursorCancelIn() {
    this.cursorCancelClass = 'cursor-in';
  }

  cursorCancelOut() {
    this.cursorCancelClass = 'no-focus';
  }

 closeApp(): void {
   this.clickSound.play();
   this.displayExitGame.emit();
 }

 closeExitDialog() {
   this.clickSound.play();
   this.displayExitDialog.emit();
 }

}
