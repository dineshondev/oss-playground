import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import {Requisition} from 'src/app/model/requisition.model';
import {FormControl, FormGroup} from '@angular/forms';
import {MetaContextComponent, UIMeta} from '@ngx-metaui/rules';
import {ReqLineItemRule, RequisitionRule} from '../../rules/user-rules'


@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition-form.component.html',
  styleUrls: ['./requisition-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequisitionFormComponent implements AfterViewInit {
  @Input()
  public req: Requisition;


  @ViewChild('rootContext')
  mc: MetaContextComponent;

  rules: any = ['Requisition.oss', 'ReqLineItem.oss'];

  group: FormGroup = new FormGroup({});
  name2Rule: Map<string, string> = new Map<string, string>();
  currentRule = '';


  constructor(public _cd: ChangeDetectorRef, private ruleEngine: UIMeta) {
    this.group.addControl('ruleType', new FormControl(''));
    this.group.addControl('oss', new FormControl(''));
    this.ruleEngine.registerDependency('controller', this);
  }

  ngAfterViewInit(): void {

    this.name2Rule.set('Requisition.oss', RequisitionRule.replace(/ɵ/g, '\n'));
    this.name2Rule.set('ReqLineItem.oss', ReqLineItemRule.replace(/ɵ/g, '\n'));
  }


  onChange(event: Event) {
    console.log('rule => ', event);
    this.currentRule = this.name2Rule.get(this.group.controls['ruleType'].value);
  }


  reloadRule() {
    this.ruleEngine.reloadRuleFile({
      module: 'App',
      filePath: this.group.controls['ruleType'].value,
      content: this.group.controls['oss'].value
    });
    this.ruleEngine.registerDependency('controller', this);
    this.mc.markDirty();
    this._cd.markForCheck();
  }
}
