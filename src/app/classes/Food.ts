import { Case } from './Case';

export class Food {
  case: Case;
  count = 0;

  constructor(caseFood: Case) {
this.case =  caseFood;
this.count = 0;
  }

  getCase(): Case {
    return this.case;
  }

  setCase(caseFood: Case): void {
    this.case = caseFood;
  }

  getCount(): number {
    return this.count;
  }

  setCount(countFood) {
    this.count = countFood;
  }
}
