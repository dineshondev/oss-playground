import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisition } from 'src/app/model/requisition.model';
import { IMetaRequisition, MetaObjectService } from 'src/app/services/meta-object.service';

@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition-form.component.html',
  styleUrls: ['./requisition-form.component.scss'],
})
export class RequisitionFormComponent implements OnInit {

  public req: Requisition;
  @Input()
  set requisition(req: Requisition) {
    this.req = req;
    this.metaObjectService.setObject(req);
  }

  public meta$: Observable<IMetaRequisition>;

  constructor(
    private metaObjectService: MetaObjectService,
  ) { }

  public ngOnInit(): void {
    this.meta$ = this.metaObjectService.meta$;
  }

}
