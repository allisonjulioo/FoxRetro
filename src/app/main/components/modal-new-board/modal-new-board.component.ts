import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BoardsService } from './../../../services/boards/boards.service';
import { ToastService } from './../../../services/toasts/toasts.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'v-modal-new-board',
  templateUrl: './modal-new-board.component.html',
  styleUrls: ['./modal-new-board.component.scss']
})
export class ModalNewBoardComponent implements OnInit {
  @Input() board;
  boardForm: FormGroup;
  loading: Boolean = false;
  submited: Boolean = false;
  get a() { return this.boardForm.controls; }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public boardService: BoardsService,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    this.boardForm = this.fb.group({
      id: [this.board.id],
      title: [this.board.title, [Validators.required, Validators.minLength(3)]],
      user_votes: [this.board.user_votes, [Validators.required]]
    });
  }
  public saveBoard() {
    this.loading = this.submited = true;
    if (this.boardForm.invalid) {
      this.loading = false;
      return;
    }
    this.boardService[this.board.id ? 'update' : 'create'](this.boardForm.value)
      .pipe(first())
      .subscribe(res => this.activeModal.close(this.boardForm.value),
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
