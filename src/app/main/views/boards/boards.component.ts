import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { Boards } from 'src/app/models/boards/boards';
import { Devices } from 'src/app/models/devices/devices';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { ModalNewBoardComponent } from '../../components/modal-new-board/modal-new-board.component';
import { BoardsService } from './../../../services/boards/boards.service';

@Component({
  selector: 'boards',
  templateUrl: './boards.component.html',
  styles: [':host { width: 100%;}'],
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  public page = 1;
  public cards: Boards[] = [];
  public devices: Devices;
  public attempt = 0;
  public loading = true;
  public modalOptions = {
    windowClass: 'animated fadeIn faster',
    backdropClass: 'modal-primary-backdrop',
  };

  constructor(
    private modalService: NgbModal,
    private confirm: ConfirmService,
    public toastService: ToastService,
    private boardService: BoardsService,
    private toast: ToastService,
    private store: Store<{ responsive: {} }>
  ) {}

  ngOnInit(): void {
    this.getBoards();
    this.store.pipe(select('responsive')).subscribe((devices: Devices) => {
      this.devices = devices;
    });
  }

  public reloadBoards() {
    this.attempt = 0;
    this.getBoards();
  }
  private async getBoards(): Promise<void> {
    this.cards = await this.boardService.get().toPromise();
    this.loading = this.cards.length === 0;
    if (!this.cards.length && this.attempt <= 2) {
      setTimeout(() => {
        this.getBoards();
        this.attempt++;
      }, 3000);
    } else {
      this.loading = false;
    }
  }
  public editBoard(board?: Boards) {
    this.openModalBoard(board);
  }
  public deleteBoard(board: Boards) {
    this.confirm.open(`Deseja excluir o board ${board.title}?`).then((evt) => {
      if (evt) {
        this.boardService
          .delete(board.id)
          .pipe(first())
          .subscribe(() => this.onSubmitted('success', 'Board excluido'));
      }
    });
  }
  private onSubmitted(type: string, message: string) {
    this.toast.show(message, {
      delay: 2500,
      autohide: true,
      type,
    });
    this.getBoards();
  }
  public openModalBoard(board?: Boards) {
    const modalRef = this.modalService.open(
      ModalNewBoardComponent,
      this.modalOptions
    );
    modalRef.componentInstance.board = board;
    modalRef.result
      .then((result) => {
        if (result.id) {
          this.boardService
            .update(result)
            .pipe(first())
            .subscribe((res) =>
              this.onSubmitted('success', 'Board atualizado')
            );
        }
        this.getBoards();
      })
      .catch((err) => console.log(err));
  }
  public onSubmitSearch(value: string) {
    const data = {
      key: 'title',
      value,
    };
    this.boardService.search(data).subscribe((cards) => (this.cards = cards));
  }
}
