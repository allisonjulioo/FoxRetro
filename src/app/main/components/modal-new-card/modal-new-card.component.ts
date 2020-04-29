import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BoardsService } from './../../../services/boards/boards.service';
import { ToastService } from './../../../services/toasts/toasts.service';
import { first } from 'rxjs/operators';
import { CardsService } from './../../../services/cards/cards.service';


@Component({
  selector: 'modal-new-card',
  templateUrl: './modal-new-card.component.html',
  styleUrls: ['./modal-new-card.component.scss']
})
export class ModalNewCardComponent implements OnInit {
  @Input() column;
  @ViewChild('content', { static: false }) content: ElementRef;
  newCardForm: FormGroup;
  loading: Boolean = false;
  submited: Boolean = false;
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
  ngAfterViewInit() {
    this.content.nativeElement.focus();
  }

  public saveCard() {
    this.loading = this.submited = true;
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
      type: type
    })
  }

}
