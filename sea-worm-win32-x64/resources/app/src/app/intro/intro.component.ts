import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  musicIntro = new Audio('.\\assets\\sounds\\gameIntro.mp3');
  @Output() closeIntro = new EventEmitter();

    constructor() { }

    ngOnInit() {
      this.playIntro();
    }

    playIntro(): void {
  this.musicIntro.play();
  setTimeout(() => {
    this.closeIntro.emit();
  }, 8000);
    }

}
