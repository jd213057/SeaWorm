export class Save {
  public id: number;
  public score: number;
  public code1: boolean;
  public code2: boolean;
  public date: string;

  constructor(id, score, code1, code2) {
    this.id = id;
    this.score = score;
    this.code1 = code1;
    this.code2 = code2;
    this.date = this.getSaveTime();
  }

  getSaveTime(): string {
    const saveDay = new Date();
    const year = saveDay.getUTCFullYear().toString();
    const month = saveDay.getUTCMonth().toString();
    const day = saveDay.getUTCDay().toString();
    const hour = saveDay.getUTCHours().toString();
    const min = saveDay.getUTCMinutes().toString();
    const sec = saveDay.getUTCSeconds().toString();
    return year + '/' + month + '/' + day + '-' + hour + ':' + min + ':' + sec;
  }
}
