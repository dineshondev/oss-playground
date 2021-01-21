/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const ReqLineItemRule = 'class=ReqLineItem {ɵ  field=(price, shortText, supplier, companyCode, quantity ) {ɵ    after: zLeft;ɵ  }ɵɵ  field=shortText {ɵ    editable:false;ɵ    label: "Product Name";ɵ  }ɵɵ  field=supplier {ɵ    editable:false;ɵ    label: "Supplier";ɵ  }ɵɵ  field=price {ɵ    editable:false;ɵ    label: "Unit Price";ɵ  }ɵɵ  field=quantity {ɵ     label: "Qty";ɵ     valid: ${ parseInt(value) >= 1 ? true : "Minimum Qty not met"};ɵ  }ɵɵ  field=companyCode {ɵ    editable:false;ɵ    visible:false;ɵ    label: "Company Code";ɵ  }ɵɵ  field=minQuantity {ɵ      visible:false;ɵ  }ɵɵ  zNone => *;ɵ  zLeft => shortText  =>  supplier  => companyCode  => quantity => price;ɵ}ɵ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 