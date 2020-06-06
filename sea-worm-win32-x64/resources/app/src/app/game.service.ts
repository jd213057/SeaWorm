import { Injectable } from '@angular/core';
import { Save } from './classes/Save';

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
records: Save[] = [];

  constructor() {
    this.loadLocalStorageParam();
  }

  loadLocalStorageParam(): void {
    if (localStorage.length == 8) {
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
      localStorage.setItem('audio', this.audio);
      this.imgChoice = 'corail';
      localStorage.setItem('imgChoice',  this.imgChoice);
      this.themeChoice = 'lava';
      localStorage.setItem('themeChoice', this.themeChoice);
      this.level = 175;
      localStorage.setItem('level', this.level.toString());
      this.YOUAREDEAD = false;
      localStorage.setItem('YOUAREDEAD', 'false');
      this.AGAINSTALLODDS = false;
      localStorage.setItem('AGAINSTALLODDS', 'false');
      this.NOBULLSHIT = false;
      localStorage.setItem('NOBULLSHIT', 'false');
      localStorage.setItem('records', JSON.stringify(this.records));
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

getRecords(): Save[] {
  return this.records;
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

saveRecord(score: number, code1: boolean, code2: boolean): void {
  let lastIdNb = 0;
  let recordToSave: Save;
  const records = localStorage.getItem('records');
  if (records != null && records !== '[]') {
    this.records = JSON.parse(records);
    lastIdNb = this.records[this.records.length - 1].id;
    lastIdNb ++;
}
  const level = this.getLevel();
  let levelString;
  console.log(level);
  switch (level) {
    case 100:
      console.log('saved');
      levelString = 'Difficile';
      break;
  case 175:
    console.log('saved');
    levelString = 'Moyen';
    break;
    case 250:
      console.log('saved');
      levelString = 'Facile';
      break;
}
  console.log(levelString);
  recordToSave = new Save(lastIdNb, score, levelString, code1, code2);
  this.records.push(recordToSave);
  const newRecordsList = JSON.stringify(this.records);
  localStorage.setItem('records', newRecordsList);
}

getRecordListSortedAsc(): Save[] {
  let scoreSortedAsc: Save[] = [];
  const scoreList: Save[] = [];
  const recordsList: Save[] = JSON.parse(localStorage.getItem('records'));
  for (const save of recordsList) {
    scoreList.push(save);
}
  scoreList.sort((a, b) => {
    if (a.score == b.score) {
      let aLevel: number;
      let bLevel: number;
      const levelA = a.level;
      const levelB = b.level;
      switch (levelA) {
        case 'Facile':
          aLevel = 1;
          break;
        case 'Moyen':
          aLevel = 2;
          break;
        case 'Difficile':
          aLevel = 3;
          break;
      }
      switch (levelB) {
        case 'Facile':
          bLevel = 1;
          break;
        case 'Moyen':
          bLevel = 2;
          break;
        case 'Difficile':
          bLevel = 3;
          break;
      }
      if (a.level == b.level) {
        const aCode1 = a.code1.toString();
        const bCode1 = b.code1.toString();
        let aCode1Num;
        let bCode1Num;
        switch (aCode1) {
  case 'true':
    aCode1Num = 1;
    break;
    case 'false':
      aCode1Num = 0;
}
        switch (bCode1) {
  case 'true':
    bCode1Num = 1;
    break;
    case 'false':
      bCode1Num = 0;
}
        if (b.code1 == a.code1) {
  const aCode2 = a.code2.toString();
  const bCode2 = b.code2.toString();
  let aCode2Num;
  let bCode2Num;
  switch (aCode2) {
case 'true':
aCode2Num = 1;
break;
case 'false':
aCode2Num = 0;
}
  switch (bCode1) {
case 'true':
bCode2Num = 1;
break;
case 'false':
bCode2Num = 0;
}
  return aCode2Num - bCode2Num;
}
        return aCode1Num - bCode1Num;
      }
      return aLevel - bLevel;
    }
    return a.score - b.score;
});
  scoreSortedAsc = scoreList;
  return scoreSortedAsc;
}

getRecordListSortedDsc(): Save[] {
  let scoreSortedDsc: Save[] = [];
  const scoreList: Save[] = [];
  const recordsList: Save[] = JSON.parse(localStorage.getItem('records'));
  for (const save of recordsList) {
    scoreList.push(save);
}
  scoreList.sort((a, b) => {
    if (a.score == b.score) {
      let aLevel: number;
      let bLevel: number;
      const levelA = a.level;
      const levelB = b.level;
      switch (levelA) {
        case 'Facile':
          aLevel = 1;
          break;
        case 'Moyen':
          aLevel = 2;
          break;
        case 'Difficile':
          aLevel = 3;
          break;
      }
      switch (levelB) {
        case 'Facile':
          bLevel = 1;
          break;
        case 'Moyen':
          bLevel = 2;
          break;
        case 'Difficile':
          bLevel = 3;
          break;
      }
      if (a.level == b.level) {
        const aCode1 = a.code1.toString();
        const bCode1 = b.code1.toString();
        let aCode1Num;
        let bCode1Num;
        switch (aCode1) {
  case 'true':
    aCode1Num = 1;
    break;
    case 'false':
      aCode1Num = 0;
}
        switch (bCode1) {
  case 'true':
    bCode1Num = 1;
    break;
    case 'false':
      bCode1Num = 0;
}
        if (b.code1 == a.code1) {
  const aCode2 = a.code2.toString();
  const bCode2 = b.code2.toString();
  let aCode2Num;
  let bCode2Num;
  switch (aCode2) {
case 'true':
aCode2Num = 1;
break;
case 'false':
aCode2Num = 0;
}
  switch (bCode1) {
case 'true':
bCode2Num = 1;
break;
case 'false':
bCode2Num = 0;
}
  return bCode2Num - aCode2Num;
}
        return bCode1Num - aCode1Num;
      }
      return bLevel - aLevel;
    }
    return b.score - a.score;
});
  scoreSortedDsc = scoreList;
  return scoreSortedDsc;
}

eraseDataMemory(): void {
  localStorage.setItem('records', '[]');
}

cleanLocalStorage(): void {
  localStorage.clear(); }
}
