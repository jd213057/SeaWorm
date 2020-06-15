import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-menu-template',
  templateUrl: './menu-template.component.html',
  styleUrls: ['./menu-template.component.css']
})
export class MenuTemplateComponent implements OnInit {
  onInit = false;
  gameActive = true;
  userEvent = true;
  screenSaverTimer;

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.onInit = true;
  }

  getBackgroundImg(): string {
    if (this.gameService.getImgBackgroundTemp() == null || this.gameService.getImgBackgroundTemp() == undefined) {
      return this.gameService.getImgPref();
    }
    return this.gameService.getImgBackgroundTemp();
  }
}
