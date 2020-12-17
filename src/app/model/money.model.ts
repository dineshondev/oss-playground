import {Value} from '@ngx-metaui/rules';

export class Money implements Value {
  amount: number;
  currency: string;


  constructor(amount: number = 0, currency: string = 'USD') {
    this.amount = amount;
    this.currency = currency;
  }

  className(): string {
    return 'Money';
  }

  clone(): Value {
    return undefined;
  }

  getTypes(): any {
    return {
      amount: Number,
      currency: String
    };
  }


}
