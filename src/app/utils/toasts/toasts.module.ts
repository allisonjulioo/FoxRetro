import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsComponent } from './toasts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ToastsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  exports: [
    ToastsComponent
  ]
})
export class ToastsModule { }
