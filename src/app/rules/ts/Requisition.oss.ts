/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const RequisitionRule = 'class=Requisition {ɵɵ  field=title {ɵ    trait: required;ɵ    label:"Name";ɵ  }ɵɵ  field=dueOn {ɵ    label:"Delivered by";ɵ  }ɵɵ  field=status {ɵ    label: "State";ɵ  }ɵɵ  field=totalNetAmount {ɵ    label: "Total Amount";ɵ  }ɵɵ  field=lineItems {ɵ     valid: ${value && value.length > 0 ? "You must have more than 1 Lineitem" : null};ɵ  }ɵ  zNone => *;ɵ  zLeft => uniqueName => title  =>  status  => totalNetAmount  => dueOn => lineItems;ɵ}ɵɵdocumentType=RV {ɵ  class=Requisition { field=title { visible: false; } }ɵ}ɵɵɵ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 