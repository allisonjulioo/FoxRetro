import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { CardsService } from './../../../services/cards/cards.service';
import { ToastService } from './../../../services/toasts/toasts.service';


@Component({
  selector: 'modal-new-card',
  templateUrl: './modal-new-card.component.html',
  styleUrls: ['./modal-new-card.component.scss']
})
export class ModalNewCardComponent implements OnInit {
  @Input() column;
  @ViewChild('content', { static: false }) content: ElementRef;
  newCardForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public cardsService: CardsService,
    private toast: ToastService) {
  }
  get a() { return this.newCardForm.controls; }

  ngOnInit(): void {
    this.newCardForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]],
    });
  }


  public saveCard() {
    this.loading = this.submitted = true;
    if (this.newCardForm.invalid) {
      this.loading = false;
      return;
    }
    this.cardsService.create(this.newCardForm.value, this.column.id)
      .pipe(first())
      .subscribe(res => this.activeModal.close(this.newCardForm.value),
        error => this.onSubmited('error', 'Ops! algo deu errado'));

  }
  private onSubmited(type: string, message: string) {
    this.loading = false;
    this.toast.show(message, {
      delay: 2500,
      autohide: true,
      type
    });
  }
  ngAfterViewInit() {
    this.content.nativeElement.focus();
  }
}
