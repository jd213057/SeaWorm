import { Case } from './Case';

export class Food {
  case: Case;
  count: number;
  bonus: boolean;

  constructor(caseFood: Case) {
this.case =  caseFood;
this.count = 0;
this.bonus = false;
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

  getBonus(): boolean {
    return this.bonus;
  }

  setBonus(bonus: boolean): void {
    this.bonus = bonus;
  }
}
