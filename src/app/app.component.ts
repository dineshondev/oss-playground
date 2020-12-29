import {Component, Inject, OnInit} from '@angular/core';
import {Context, META_RULES, MetaRules} from '@ngx-metaui/rules';
import {Requisition} from './model/requisition.model';
import {Money} from './model/money.model';
import {ReqLineItem} from './model/requisition-li.model';
import {Supplier} from './model/supplier.model';
import {CompanyCode} from './model/company-code.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pr: Requisition;
  manualControl = true;

  constructor(@Inject(META_RULES) protected meta: MetaRules) {
  }

  ngOnInit(): void {
    this.pr = new Requisition('PR1', 'Office Items', new Date(), 'Approved',
      new Money(520));

    this.pr.addLineItem(new ReqLineItem('Apple Keyboard', new Supplier('Apple Inc.'),
      new Money(500), 1, new CompanyCode('CC01', 'CC01 description')));

    this.pr.addLineItem(new ReqLineItem('Pen', new Supplier('Office Depot.'),
      new Money(10), 2, new CompanyCode('CC01', 'CC01 description')));

    if (this.manualControl) {
      this.experimentDirectlyWithMetaUI();
    }

  }

  private experimentDirectlyWithMetaUI() {
    const context = this.meta.newContext();
    context.push();
    context.set('layout', 'Inspect');
    context.set('operation', 'view');
    context.set('object', this.pr);

    context.setScopeKey('class');

    console.log('@@ Pushing field TITLE and checking properties >>>');
    context.set('field', 'title');
    this.printProperty('label', context);


    console.log('@@ Now trying to push another contextual property, to see if right selector is triggered where we change name >>>');
    console.log('   >> Wrapping push with context.push(); context frame so I can easily roll it back.');
    context.push();
    context.set('documentType', 'RV');
    this.printProperty('label', context);
    context.pop();

    console.log('@@ After documentType rollback we expect default label');
    this.printProperty('label', context)

    context.pop();
  }

  private printProperty(propertyName: string, context: Context) {
    console.log(`\tProperty ${propertyName} :`, context.propertyForKey(propertyName));
  }
}
