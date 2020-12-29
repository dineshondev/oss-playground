import { TestBed } from '@angular/core/testing';

import { MetaObjectService } from './meta-object.service';

describe('MetaObjectService', () => {
  let service: MetaObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
