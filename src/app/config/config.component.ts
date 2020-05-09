import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GameService } from '../game.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  @Output() displayConfig = new EventEmitter();
  checkoutForm: FormGroup;
  cursorApplyClass = 'no-focus';
  cursorExitClass = 'no-focus';
  clickSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');

    constructor(private formBuilder: FormBuilder, private gameService: GameService) {
      this.checkoutForm = this.formBuilder.group({
      audio: ['audioOn'],
      themeChoice: ['jazz'],
      nbRound: ['3'],
      imgChoice: ['saloon']
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
      e.style.backgroundColor = 'gold';
      }, false);
      applyButton.addEventListener('mouseleave', (event) => {
        const e = event.target as HTMLElement;
        e.style.backgroundColor = '';
      }, false);
      exitButton.addEventListener('mouseenter', ( event ) => {
        const e = event.target as HTMLElement;
        e.style.backgroundColor = 'gold';
        }, false);
      exitButton.addEventListener('mouseleave', (event) => {
          const e = event.target as HTMLElement;
          e.style.backgroundColor = '';
        }, false);
    }

    onSubmit() {
      this.clickSound.play();
      this.gameService.setAudio(this.checkoutForm.get('audio').value);
      this.gameService.setThemeChoice(this.checkoutForm.get('themeChoice').value);
      this.gameService.setNbRound(this.checkoutForm.get('nbRound').value);
      this.gameService.setBackgroundImg(this.checkoutForm.get('imgChoice').value);
    }

    exitConfig(): void {
      this.clickSound.play();
      this.displayConfig.emit();
    }

}
