/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const RequisitionRule = 'class=Requisition {ɵɵ field=uniqueName {ɵ   editable:false;ɵ   label:"Id";ɵ  }ɵɵ  field=title {ɵ    trait: required;ɵ    label:"Name";ɵ  }ɵɵ  field=dueOn {ɵ    label:"Delivered by";ɵ  }ɵɵ  field=status {ɵ    label: "State";ɵ    component: Select;ɵ    choices:["New", "In Progress", "Approving", "Approved", "Ordered"];ɵ  }ɵɵ  field=totalNetAmount {ɵ    label: "Total Amount";ɵ  }ɵɵ  field=lineItems {ɵ     component:Table;ɵ  }ɵ  zNone => *;ɵ  zLeft => uniqueName => title  =>  status  => totalNetAmount  => dueOn => lineItems;ɵ}ɵɵɵɵ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 