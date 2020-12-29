import { Inject, Injectable } from '@angular/core';
import { META_RULES, MetaRules, Context } from '@ngx-metaui/rules';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetaObjectService {

  private context: Context;

  public meta$: Subject<IMetaRequisition> = new BehaviorSubject(null);

  constructor(
    @Inject(META_RULES) protected meta: MetaRules,
  ) {
    this.context = this.meta.newContext();
    this.context.push();
    this.context.set('layout', 'Inspect');
    this.context.set('operation', 'view');
  }

  public setObject(obj: any): void {
    this.context.set('object', obj);
    this._update();
  }

  private _update(): void {
    const meta: IMetaRequisition = {
      title: {
        label: 'Title',
        disabled: false,
        hidden: false,
        required: true,
      },
      status: {
        label: 'Status',
        disabled: false,
        hidden: false,
        required: true,
      },
      totalNetAmount: {
        label: 'Total',
        disabled: true,
        hidden: false,
        required: false,
      },
    };

    const props = ['disabled', 'hidden', 'label', 'required'];
    const fields = this._getFields('Requisition');

    for (const field of fields) {
      this.context.set('field', field);
      if (!meta[field]) {
        meta[field] = {...DEFAULT_META_FIELD};
      }
      for (const prop of props) {
        meta[field][prop] = this.context.propertyForKey(prop);
      }
    }

    this.meta$.next(meta);
  }

  private _getFields(className: string): string[] {
    this.context.set('class', className);
    let keys = [];
    const fieldMap: Map<string, any> = this.context.propertyForKey('fieldsByZone');
    fieldMap.forEach((zone) => {
      if (zone) {
        keys = keys.concat(zone);
      }
    });
    return keys;
  }

}

export interface IMetaField {
  label: string;
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
}
export const DEFAULT_META_FIELD: IMetaField = {
  label: '',
    disabled: false,
    hidden: false,
    required: false,
};


export interface IMetaRequisition {
  title: IMetaField;
  status: IMetaField;
  totalNetAmount: IMetaField;
  dueOn?: IMetaField;
  uniqueName?: IMetaField;
  lineItems?: IMetaField;
}
