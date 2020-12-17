import {Supplier} from './supplier.model';
import {Value} from '@ngx-metaui/rules';
import {Money} from './money.model';
import {CompanyCode} from './company-code.model';

export class ReqLineItem implements Value {
  shortText: string;
  supplier: Supplier;
  price: Money;
  quantity: number;
  companyCode: CompanyCode;


  constructor(shortText?: string, supplier?: Supplier, price?: Money, quantity?: number, companyCode?: CompanyCode) {
    this.shortText = shortText;
    this.supplier = supplier;
    this.price = price;
    this.quantity = quantity;
    this.companyCode = companyCode;
  }

  className(): string {
    return 'ReqLineItem';
  }

  clone(): Value {
    return undefined;
  }

  getTypes(): any {
    return {
      shortText: String,
      supplier: Supplier,
      price: Money,
      quantity: Number,
      companyCode: CompanyCode
    };
  }
}
