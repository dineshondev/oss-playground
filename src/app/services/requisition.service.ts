import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CompanyCode } from '../model/company-code.model';
import { Money } from '../model/money.model';
import { ReqLineItem } from '../model/requisition-li.model';
import { Requisition } from '../model/requisition.model';
import { Supplier } from '../model/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class RequisitionService {

  requisition$: Subject<Requisition> = new Subject();

  constructor() { }

  getRequisition(reqId: string): void {
    const req = this._generateRequisition(reqId);
    this.requisition$.next(req);
  }

  private _generateRequisition(prId: string): Requisition {
    let data = REQUISITIONS.find(item => item.uniqueName === prId);
    if (!data) {
      data = REQUISITIONS[0];
    }
    const req = new Requisition(
      data.uniqueName,
      data.title,
      data.dueOn,
      data.status,
      new Money(data.totalNetAmount),
    );

    if (Array.isArray(data.lineItems)) {
      data.lineItems.forEach(item => {
        req.addLineItem(new ReqLineItem(
          item.shortText,
          new Supplier(item.supplier.name),
          new Money(item.price),
          item.quantity,
          new CompanyCode(item.companyCode.name, item.companyCode.description)
        ));
      });
    }

    return req;
  }
}

const REQUISITIONS: any[] = [{
  uniqueName: 'PR1',
  title: 'Office Items',
  dueOn: new Date(),
  status: 'Approved',
  totalNetAmount: 520,
  lineItems: [{
    shortText: 'Apple Keyboard',
    supplier: {
      name: 'Apple Inc.',
    },
    price: 500,
    quantity: 1,
    companyCode: {
      name: 'CC01',
      description: 'CC01 description',
    },
  }, {
    shortText: 'Pen',
    supplier: {
      name: 'Office Depot',
    },
    price: 10,
    quantity: 2,
    companyCode: {
      name: 'CC01',
      description: 'CC01 description',
    },
  }],
}, {
  uniqueName: 'PR2',
  title: 'Conference Items',
  dueOn: new Date(),
  status: 'Draft',
  totalNetAmount: 160000,
  lineItems: [{
    shortText: 'T-Shirts',
    supplier: {
      name: 'T-Shirts R Us',
    },
    price: 10,
    quantity: 10000,
    companyCode: {
      name: 'CC01',
      description: 'CC01 description',
    },
  }, {
    shortText: 'Hats',
    supplier: {
      name: 'Hat Emporium',
    },
    price: 12,
    quantity: 5000,
    companyCode: {
      name: 'CC02',
      description: 'CC02 description',
    },
  }],

}];
