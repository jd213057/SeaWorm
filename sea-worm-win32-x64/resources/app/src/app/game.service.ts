import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
audio: string;
themeChoice: string;
level: number;
imgChoice: string;
YOUAREDEAD: boolean;
AGAINSTALLODDS: boolean;
NOBULLSHIT: boolean;

  constructor() {
    this.loadLocalStorageParam();
  }

  loadLocalStorageParam(): void {
    if (localStorage.length >= 7) {
      this.audio = localStorage.getItem('audio');
      this.themeChoice = localStorage.getItem('themeChoice');
      this.level = parseInt(localStorage.getItem('level'), 10);
      this.imgChoice = localStorage.getItem('imgChoice');
      let booleanString = localStorage.getItem('YOUAREDEAD');
      this.YOUAREDEAD = booleanString == 'true' ? true : false;
      booleanString = localStorage.getItem('AGAINSTALLODDS');
      this.AGAINSTALLODDS = booleanString == 'true' ? true : false;
      booleanString = localStorage.getItem('NOBULLSHIT');
      this.NOBULLSHIT = booleanString == 'true' ? true : false;
    } else {
      this.audio = 'audioOn';
      this.themeChoice = 'lava';
      this.level = 400;
      this.imgChoice = 'corail';
      this.YOUAREDEAD = false;
      this.AGAINSTALLODDS = false;
      this.NOBULLSHIT = false;
    }
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

  getLevelPref() {
    return this.level;
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

getLevel(): number {
  return this.level;
}

setLevel(valueInput: number): void {
  if (valueInput == 250 || valueInput == 175 || valueInput == 100) {
      this.level = valueInput;
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

saveParamsInLocalStorage(): void {
  localStorage.setItem('audio', this.audio);
  localStorage.setItem('themeChoice', this.themeChoice);
  localStorage.setItem('level', this.level.toString());
  localStorage.setItem('imgChoice',  this.imgChoice);
  this.YOUAREDEAD == true ? localStorage.setItem('YOUAREDEAD', 'true') : localStorage.setItem('YOUAREDEAD', 'false');
  this.AGAINSTALLODDS == true ? localStorage.setItem('AGAINSTALLODDS', 'true') : localStorage.setItem('AGAINSTALLODDS', 'false');
  this.NOBULLSHIT == true ? localStorage.setItem('NOBULLSHIT', 'true') : localStorage.setItem('NOBULLSHIT', 'false');
}

checkLastRecord(): number {
  const listOfKeys = [];
  const listOfRecords = [];
  const length = localStorage.length - 1;
  for (let i = 0; i <= length; i++) {
    listOfKeys.push(parseInt(localStorage.key(i), 10));
  }
  for (const value of listOfKeys) {
    if (isNaN(value) == false) {
      listOfRecords.push(value);
    }
  }
  listOfRecords.sort((a, b) => {
    return a - b;
  });
  return listOfRecords.length - 1;
}

}
