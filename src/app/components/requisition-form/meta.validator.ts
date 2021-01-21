import {Directive, Input} from '@angular/core';
import {AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';
import {MetaContextComponent} from '@ngx-metaui/rules';

function validateMetaRulesFactory(): ValidatorFn {
  return (c: AbstractControl) => {
    const context = c['context'];
    const editing = context.booleanPropertyForKey('editing', false);

    if (editing) {
      context.value = (c.value != context.value) ? c.value : context.value
      const errorMsg = context.validateErrors();
      return errorMsg ? {'metavalid': {'msg': errorMsg}} : null;
    }
    return null;
  }
}


@Directive({
  selector: '[metaValid][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: MetaValidator, multi: true}
  ]
})
export class MetaValidator implements Validator {
  validator: ValidatorFn;

  @Input('context')
  mc: MetaContextComponent;


  constructor() {
    this.validator = validateMetaRulesFactory();
  }

  validate(control: FormControl) {
    control['context'] = this.mc.context;
    return this.validator(control);
  }

}
