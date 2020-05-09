import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
audio = 'audioOn';
themeChoice = 'jazz';
nbRound = 3;
imgChoice = 'saloon';
YOUAREDEAD = false;
AGAINSTALLODDS = false;
NOBULLSHIT = false;

  constructor() {
  }

getAudio(): boolean {
  if (this.audio == 'audioOn') {
    return true;
  } else { return false; }
}

setAudio(valueInput: string): void {
  if (valueInput == 'audioOn' || valueInput == 'audioOff') {
    this.audio = valueInput;
  }
}

getThemeChoice(): string {
  switch (this.themeChoice) {
    case 'jazz':
      return '.\\assets\\sounds\\Disney Pixar Lava Short Film (karaoke Instrumental with Lyrics).mp3';
    case 'western':
      return '.\\assets\\sounds\\Yo Ho A Pirate Life For Me - The Pirates Of The Caribbean (Full Ride Audio).mp3';
    case 'retro':
      return '.\\assets\\sounds\\Wind Waker Ocean Theme.mp3';
  }
}

setThemeChoice(valueInput: string): void {
  if (valueInput == 'jazz' || valueInput == 'western' || valueInput == 'retro') {
    this.themeChoice = valueInput;
  }
}

getNbRound(): number {
  return this.nbRound;
}

setNbRound(valueInput: number): void {
  if (valueInput == 1 || valueInput == 3 || valueInput == 5) {
      this.nbRound = valueInput;
  }
}

getBackgroundImg(): string {
  switch (this.imgChoice) {
    case 'casino':
      return './assets/images/background1.jpg';
    case 'saloon':
      return './assets/images/background2.png';
    case 'retro':
      return './assets/images/background3.jpg';
  }
}

setBackgroundImg(valueInput: string): void {
  if (valueInput == 'casino' || valueInput == 'saloon' || valueInput == 'retro') {
    this.imgChoice = valueInput;
  }
}

getCode1(): boolean {
  return this.YOUAREDEAD;
}

setCode1(valueInput: boolean): void {
this.YOUAREDEAD = valueInput;
}

getCode2(): boolean {
  return this.AGAINSTALLODDS;
}

setCode2(valueInput: boolean): void {
this.AGAINSTALLODDS = valueInput;
}

getCode3(): boolean {
return this.NOBULLSHIT;
}

setCode3(valueInput: boolean): void {
  if (valueInput) {
    this.setCode1(false);
    this.setCode2(false);
    this.setCode3(true);
  }
}

}
