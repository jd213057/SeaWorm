import { Case } from './Case';

export class Poison {
  case: Case;
  toShow: boolean;

  constructor(casePoison: Case) {
    this.case =  casePoison;
    this.toShow = true;
      }

  getCase(): Case {
    return this.case;
  }

  setCase(casePoison: Case): void {
    this.case = casePoison;
  }

  getToShow(): boolean {
    return this.toShow;
  }

  setToShow(toShow: boolean): void {
    this.toShow = toShow;
  }

  removePoison(): void {
    this.toShow = false;
  }
}
