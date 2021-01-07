import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Context, META_RULES, MetaRules} from '@ngx-metaui/rules';
import {Requisition} from './model/requisition.model';
import {Money} from './model/money.model';
import {ReqLineItem} from './model/requisition-li.model';
import {Supplier} from './model/supplier.model';
import {CompanyCode} from './model/company-code.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequisitionService } from './services/requisition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  pr: Requisition;
  manualControl = false;

  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(META_RULES) protected meta: MetaRules,
    private route: ActivatedRoute,
    private reqService: RequisitionService,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        this.manualControl = params.manualControl === 'true';
        const reqId = params.reqId || 'PR1';
        this.reqService.getRequisition(reqId);
        if (this.manualControl) {
          this.experimentDirectlyWithMetaUI();
        }
      }),
    );

    this.subscription.add(
      this.reqService.requisition$.subscribe(req => this.pr = req),
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private experimentDirectlyWithMetaUI(): void {
    const context = this.meta.newContext();
    context.push();
    context.set('layout', 'Inspect');
    context.set('operation', 'view');
    context.set('object', this.pr);

    context.setScopeKey('class');

    console.log('@@ Pushing field TITLE and checking properties >>>');
    context.push();
    context.set('field', 'title');
    this.printProperty('visible', context);
    context.pop();


    console.log('@@ Now trying to push another contextual property, to see if right selector is triggered where we change name >>>');
    console.log('   >> Wrapping push with context.push(); context frame so I can easily roll it back.');
    context.push();
    context.set('documentType', 'RV');
    context.set('field', 'title');
    this.printProperty('visible', context);
    context.pop();

    console.log('@@ After documentType rollback we expect default label');
    context.set('field', 'title');
    this.printProperty('visible', context)

    context.pop();
  }

  private printProperty(propertyName: string, context: Context) {
    console.log(`\tProperty ${propertyName} :`, context.propertyForKey(propertyName));
  }
}
