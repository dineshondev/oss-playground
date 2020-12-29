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
    };

    this.meta$.next(meta);
  }

}

export interface IMetaField {
  label: string;
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
}

export interface IMetaRequisition {
  title: IMetaField;
  status: IMetaField;
}
