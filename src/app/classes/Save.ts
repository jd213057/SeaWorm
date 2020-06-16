import { GameService } from '../game.service';

export class Save {
  public id: number;
  public score: number;
  public level: string;
  public code1: boolean;
  public code2: boolean;
  public date: string;

  constructor(id, score, level, code1, code2) {
    this.id = id;
    this.score = score;
    this.level = level;
    this.code1 = code1;
    this.code2 = code2;
    this.date = this.getSaveTime();
  }

  getSaveTime(): string {
    const saveDay = new Date();
    const year = saveDay.getUTCFullYear().toString();
    let month = (saveDay.getUTCMonth() + 1).toString();
    if (month.length == 1) {
      month = '0' + month;
    }
    let day = saveDay.getUTCDate().toString();
    if (day.length == 1) {
      day = '0' + day;
    }
    let hour = (saveDay.getUTCHours() + 1).toString();
    if (hour.length == 1) {
      hour = '0' + hour;
    }
    let min = saveDay.getUTCMinutes().toString();
    if (min.length == 1) {
      min = '0' + min;
    }
    let sec = saveDay.getUTCSeconds().toString();
    if (sec.length == 1) {
      sec = '0' + sec;
    }
    return day + '/' + month + '/' + year + '-' + hour + ':' + min + ':' + sec;
  }
}
