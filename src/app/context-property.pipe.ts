import {FieldPath, MetaContextComponent} from '@ngx-metaui/rules';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'properties',
  pure: false
})
export class ContextPropertyPipe implements PipeTransform {

  transform(metaContext: MetaContextComponent, key: string, defaultValue?: any): any {
    if (key.includes('.')) {
      const fieldPath = key.split('.');

      // first needs to be evaluated
      const target = metaContext.myContext().propertyForKey(fieldPath[0]);
      return FieldPath.getFieldValue(target, fieldPath.slice(1).join('.')) || defaultValue;

    } else {
      return metaContext.myContext().propertyForKey(key) || defaultValue;
    }
  }
}
