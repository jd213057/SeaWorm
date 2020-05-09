import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showIntro = true;
  showGame = false;

constructor() {}

displayApps() {
this.showIntro = false;
this.showGame = true;
}

}
