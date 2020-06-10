import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  musicIntro = new Audio('.\\assets\\sounds\\gameIntro.mp3');
  @Output() closeIntro = new EventEmitter();

    constructor(protected gameService: GameService) { }

    ngOnInit() {
      this.playIntro();
    }

    playIntro(): void {
      if (this.gameService.getAudio()) {
        this.musicIntro.play();
      }
      setTimeout(() => {
    this.closeIntro.emit();
  }, 8000);
    }

}
