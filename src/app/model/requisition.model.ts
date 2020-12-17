import {ReqLineItem} from './requisition-li.model';
import {Entity} from '@ngx-metaui/rules';
import {Money} from './money.model';

export class Requisition implements Entity {
  uniqueName: string;
  title: string;
  dueOn: Date;
  status: string;
  totalNetAmount: Money;
  lineItems: Array<ReqLineItem>;


  constructor(uniqueName?: string, title?: string, dueOn?: Date, status?: string, totalNetAmount?: Money,
              lineItems?: Array<ReqLineItem>) {
    this.uniqueName = uniqueName;
    this.title = title;
    this.dueOn = dueOn;
    this.status = status;
    this.totalNetAmount = totalNetAmount;
    this.lineItems = lineItems || [];
  }


  addLineItem(li: ReqLineItem): void {
    this.lineItems.push(li);
  }


  className(): string {
    return 'Requisition';
  }

  getTypes(): any {
    return {
      uniqueName: String,
      title: String,
      dueOn: Date,
      status: String,
      totalNetAmount: Money,
      lineItems: Array(ReqLineItem)
    };
  }


  identity(): string {
    return this.uniqueName;
  }
}

