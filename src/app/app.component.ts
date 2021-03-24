import {Component, OnInit} from '@angular/core';
import {Requisition} from './model/requisition.model';
import {RequisitionService} from './services/requisition.service';
import {ActivatedRoute} from '@angular/router';
import {UIMeta} from '@ngx-metaui/rules';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pr: Requisition;

  private subscription: Subscription = new Subscription();

  constructor(
    protected meta: UIMeta,
    private route: ActivatedRoute,
    private reqService: RequisitionService,
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        const reqId = params.reqId || 'PR1';
        this.reqService.getRequisition(reqId);
      }),
    );

    this.subscription.add(
      this.reqService.requisition$.subscribe(req => this.pr = req),
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  p
}
