import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
@Output() displayHelp = new EventEmitter();
cursorClass = 'no-focus';
clickSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');

  constructor() { }

  ngOnInit() {
  }

  cursorIn() {
    this.cursorClass = 'cursor-in';
  }

  cursorOut() {
    this.cursorClass = 'no-focus';
  }

  exitHelp(): void {
    this.clickSound.play();
    this.displayHelp.emit();
  }

}

