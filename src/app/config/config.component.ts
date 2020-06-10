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
  imgToShow = this.gameService.getBackgroundImg();
  clickSound = new Audio('.\\assets\\sounds\\Button_Press_4-Marianne_Gagnon-570460555.mp3');

    constructor(private formBuilder: FormBuilder, private gameService: GameService) {
      this.checkoutForm = this.formBuilder.group({
      audio: this.gameService.getAudioPref(),
      themeChoice: this.gameService.getThemePref(),
      level: this.gameService.getLevelPref().toString(),
      imgChoice: this.gameService.getImgPref()
    });
   }

    ngOnInit() {
      this.activateInputImgChoice();
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

    activateInputImgChoice(): void {
      const sableImgChoice = document.getElementById('sableImgChoice');
      const corailImgChoice = document.getElementById('corailImgChoice');
      const algueImgChoice = document.getElementById('algueImgChoice');
      const img = document.getElementById('img');
      sableImgChoice.addEventListener('click', (event) => {
        this.imgToShow = './assets/images/background1.jpg';
      });
      corailImgChoice.addEventListener('click', (event) => {
        this.imgToShow = './assets/images/background2.png';
      });
      algueImgChoice.addEventListener('click', (event) => {
        this.imgToShow = './assets/images/background3.jpg';
      });
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
      if (this.gameService.getAudio()){
        this.clickSound.play();
      }
      this.gameService.setAudio(this.checkoutForm.get('audio').value);
      this.gameService.setThemeChoice(this.checkoutForm.get('themeChoice').value);
      this.gameService.setLevel(this.checkoutForm.get('level').value.toString());
      this.gameService.setBackgroundImg(this.checkoutForm.get('imgChoice').value);
      this.gameService.saveParamsInLocalStorage();
    }

    exitConfig(): void {
      this.clickSound.volume = 0.7;
      if (this.gameService.getAudio()){
        this.clickSound.play();
      }
      this.displayConfig.emit();
    }

}
