import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisition } from 'src/app/model/requisition.model';
import { MetaObject, MetaObjectService } from 'src/app/services/meta-object.service';

@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition-form.component.html',
  styleUrls: ['./requisition-form.component.scss'],
})
export class RequisitionFormComponent {

  @Input()
  public req: Requisition;

  constructor() { }

}
