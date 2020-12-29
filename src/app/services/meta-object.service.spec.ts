import { TestBed } from '@angular/core/testing';
import { MetaRules, MetaUIRulesModule, META_RULES } from '@ngx-metaui/rules';

import { MetaObjectService } from './meta-object.service';

describe('MetaObjectService', () => {
  let service: MetaObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MetaUIRulesModule.forRoot({'env.test': true}),
      ],
    });
    service = TestBed.inject(MetaObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
