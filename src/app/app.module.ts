import * as userRules from './rules/user-rules';
import {MetaConfig, MetaUIRulesModule, UIMeta} from '@ngx-metaui/rules';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RequisitionFormComponent} from './components/requisition-form/requisition-form.component';
import {MetaObjectService} from './services/meta-object.service';
import {RouterModule, Routes} from '@angular/router';
import {RequisitionService} from './services/requisition.service';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {MetaValidator} from './components/requisition-form/meta.validator';
import {ContextFlattenVisible} from './components/requisition-form/meta.flatten-visible.pipe';
import {DateInputConverter} from './components/requisition-form/date-converter.directive';
import {NgxCurrencyModule} from 'ngx-currency';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    RequisitionFormComponent,
    MetaValidator,
    ContextFlattenVisible,
    DateInputConverter
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
    MonacoEditorModule.forRoot(),
    RouterModule.forRoot(routes),
    MetaUIRulesModule.forRoot({loadApplicationRule: true})
  ],
  providers: [MetaObjectService, RequisitionService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private config: MetaConfig, private re: UIMeta) {
    config.registerRules(userRules)


  }
}
