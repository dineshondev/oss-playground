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

  public setDocumentType(type: string): void {
    this.context.set('documentType', type);
    this._update();
  }

  private _update(): void {
    const meta: IMetaRequisition = {
      title: {
        label: 'Title',
        disabled: false,
        visible: false,
        required: false,
      },
      status: {
        label: 'Status',
        disabled: false,
        visible: false,
        required: false,
      },
      totalNetAmount: {
        label: 'Total',
        disabled: false,
        visible: false,
        required: false,
      },
    };

    const props = ['disabled', 'visible', 'label'];
    const fields = this._getFields('Requisition');

    for (const field of fields) {
      this.context.set('field', field);
      if (!meta[field]) {
        meta[field] = {...DEFAULT_META_FIELD};
      }
      for (const prop of props) {
        meta[field][prop] = this.context.propertyForKey(prop);
      }

      // check to see if field is required
      meta[field].required = this.context.propertyForKey('trait') === 'required';
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
  visible?: boolean;
  required?: boolean;
}
export const DEFAULT_META_FIELD: IMetaField = {
  label: '',
  disabled: false,
  visible: false,
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
