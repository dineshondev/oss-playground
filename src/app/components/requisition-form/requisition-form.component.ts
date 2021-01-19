import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Requisition} from 'src/app/model/requisition.model';

@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition-form.component.html',
  styleUrls: ['./requisition-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequisitionFormComponent {

  @Input()
  public req: Requisition;

  constructor(public cd: ChangeDetectorRef) { }

}
