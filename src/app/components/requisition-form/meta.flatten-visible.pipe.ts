import {Pipe, PipeTransform} from '@angular/core';
import {KeyClass, KeyField, MetaContextComponent, PropFieldsByZone, ZonesMTLRB, ZonesTLRMB} from '@ngx-metaui/rules';

@Pipe({
  name: 'flattenVisible',
  pure: false
})
export class ContextFlattenVisible implements PipeTransform {

  transform(metaContext: MetaContextComponent, zoneList: 'form' | 'table' = 'form'): any {
    const context = metaContext.context;

    context.push();
    context.setScopeKey(KeyClass);
    const fieldsByZone = context.propertyForKey(PropFieldsByZone);

    return context.meta.flattenVisible(fieldsByZone,
      zoneList === 'form' ? ZonesMTLRB : ZonesTLRMB,
      KeyField, context);
  }
}
