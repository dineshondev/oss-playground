import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import {Requisition} from 'src/app/model/requisition.model';
import {MetaContextComponent, UIMeta} from '@ngx-metaui/rules';
import {ApplicationRule, ReqLineItemRule, RequisitionRule} from '../../rules/user-rules'


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


  rules: any = ['Application.oss', 'Requisition.oss', 'ReqLineItem.oss'];
  currentRule = '';
  currentRuleContent = '';

  name2Rule: Map<string, string> = new Map<string, string>();
  editorOptions = {theme: 'vs-dark', language: 'css'};

  constructor(public _cd: ChangeDetectorRef, private ruleEngine: UIMeta) {
    this.ruleEngine.registerDependency('controller', this);
  }

  ngAfterViewInit(): void {
    this.name2Rule.set('Application.oss', ApplicationRule.replace(/ɵ/g, '\n'));
    this.name2Rule.set('Requisition.oss', RequisitionRule.replace(/ɵ/g, '\n'));
    this.name2Rule.set('ReqLineItem.oss', ReqLineItemRule.replace(/ɵ/g, '\n'));


    setTimeout(() => {
      if (window.monaco && window.monaco.languages) {
        window.monaco.languages.css.cssDefaults.setDiagnosticsOptions({
          validate: false
        });
      }
    }, 2000);
  }


  onRuleChange(): void {
    this.currentRuleContent = this.name2Rule.get(this.currentRule);
  }

  trackByFn(index, item) {
    return item;
  }

  reloadRule() {
    this.ruleEngine.reloadRuleFile({
      module: 'App',
      filePath: this.currentRule,
      content: this.currentRuleContent
    });
    this.ruleEngine.registerDependency('controller', this);
    this.mc.markDirty();
    this._cd.detectChanges();
  }
}
