import {Supplier} from './supplier.model';
import {CompositeType, Value} from '@ngx-metaui/rules';
import {CompanyCode} from './company-code.model';

export class ReqLineItem implements Value {
  shortText: string;
  supplier: Supplier;
  price: number;
  quantity: number;
  companyCode: CompanyCode;
  minQuantity: number;

  parent: CompositeType = null;

  constructor(shortText?: string, supplier?: Supplier, price?: number, quantity?: number, companyCode?: CompanyCode, minQuantity?: number) {
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
      price: Number,
      quantity: Number,
      companyCode: CompanyCode,
      minQuantity: Number,
    };
  }
}
