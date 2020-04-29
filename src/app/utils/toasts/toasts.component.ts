import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toasts/toasts.service';

@Component({
  selector: 'toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToastsComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }
  public isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
