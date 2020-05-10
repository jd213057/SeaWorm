import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
audio = 'audioOn';
themeChoice = 'lava';
nbRound = 3;
imgChoice = 'corail';
YOUAREDEAD = false;
AGAINSTALLODDS = false;
NOBULLSHIT = false;

  constructor() {
  }

  getAudioPref(): string {
    return this.audio;
  }

  getThemePref(): string {
  return this.themeChoice;
  }

  getImgPref(): string {
    return this.imgChoice;
  }

  getNbRoundPref() {
    return this.nbRound;
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
    case 'lava':
      return '.\\assets\\sounds\\Disney Pixar Lava Short Film (karaoke Instrumental with Lyrics).mp3';
    case 'pirate':
      return '.\\assets\\sounds\\Yo Ho A Pirate Life For Me - The Pirates Of The Caribbean (Full Ride Audio).mp3';
    case 'ocean':
      return '.\\assets\\sounds\\Wind Waker Ocean Theme.mp3';
  }
}

setThemeChoice(valueInput: string): void {
  if (valueInput == 'lava' || valueInput == 'pirate' || valueInput == 'ocean') {
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
    case 'sable':
      return './assets/images/background1.jpg';
    case 'corail':
      return './assets/images/background2.png';
    case 'algue':
      return './assets/images/background3.jpg';
  }
}

setBackgroundImg(valueInput: string): void {
  if (valueInput == 'sable' || valueInput == 'corail' || valueInput == 'algue') {
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
