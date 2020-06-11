import { Case } from './Case';

export class Food {
  case: Case;
  count: number;
  type: TYPE;

  constructor(caseFood: Case) {
this.case =  caseFood;
this.count = 0;
this.type = TYPE.yellowgreen;
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

  getType(): TYPE {
    return this.type;
  }

  setType(type: TYPE): void {
    this.type = type;
  }
}

export  enum TYPE {
'yellowgreen',
'red',
'purple',
'green',
'orange',
'darkblue'
}
