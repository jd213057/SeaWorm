import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameService } from '../game.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
  @Output() displayDebug = new EventEmitter();
  checkoutForm: FormGroup;
  code1 = 'YOUAREDEAD';
  code2 = 'AGAINSTALLODDS';
  code3 = 'NOBULLSHIT';
  cursorApplyClass = 'no-focus';
  cursorExitClass = 'no-focus';
  clickSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');

    constructor(private formBuilder: FormBuilder, private gameService: GameService) {
      this.checkoutForm = this.formBuilder.group({
      inputValue: ''
    }); }

    ngOnInit() {
    }

    cursorApplyIn() {
      this.cursorApplyClass = 'cursor-in';
    }

    cursorApplyOut() {
      this.cursorApplyClass = 'no-focus';
    }

    cursorExitIn() {
      this.cursorExitClass = 'cursor-in';
    }

    cursorExitOut() {
      this.cursorExitClass = 'no-focus';
    }

    getButtonsFocus(): void {
      const applyButton = document.getElementById('apply');
      const exitButton = document.getElementById('exit');
      applyButton.addEventListener('mouseenter', ( event ) => {
      const e = event.target as HTMLElement;
      e.style.backgroundColor = 'lightslategray';
      }, false);
      applyButton.addEventListener('mouseleave', (event) => {
        const e = event.target as HTMLElement;
        e.style.backgroundColor = '';
      }, false);
      exitButton.addEventListener('mouseenter', ( event ) => {
        const e = event.target as HTMLElement;
        e.style.backgroundColor = 'lightslategray';
        }, false);
      exitButton.addEventListener('mouseleave', (event) => {
          const e = event.target as HTMLElement;
          e.style.backgroundColor = '';
        }, false);
    }

    onSubmit() {
      this.clickSound.play();
      if (this.checkoutForm.value.inputValue == this.code1) {
this.gameService.setCode1(true);
} else if (this.checkoutForm.value.inputValue == this.code2) {
  this.gameService.setCode2(true);
} else if (this.checkoutForm.value.inputValue == this.code3) {
  this.gameService.setCode3(true);
}
      return;
    }

    exitDebug(): void {
      this.clickSound.play();
      this.displayDebug.emit();
    }
}
