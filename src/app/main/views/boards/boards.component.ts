import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { ModalNewBoardComponent } from '../../components/modal-new-board/modal-new-board.component';
import { BoardsService } from './../../../services/boards/boards.service';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { Boards } from 'src/app/models/boards/boards';
import { first } from 'rxjs/operators';
import { Devices } from 'src/app/models/devices/devices';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'boards',
  templateUrl: './boards.component.html',
  styles: [':host { width: 100%;}'],
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  public page: Number = 1;
  public cards: Array<Boards> = [];
  public devices: Devices;
  public attempt: number = 0;
  public loading: boolean = true;
  public modalOptions: Object =
    {
      windowClass: 'animated fadeIn faster',
      backdropClass: 'modal-primary-backdrop',
    };

  constructor(
    private modalService: NgbModal,
    private confirm: ConfirmService,
    public toastService: ToastService,
    private boardService: BoardsService,
    private toast: ToastService,
    private store: Store<{ responsive: {} }>, ) { }


  ngOnInit(): void {
    this.getBoards();
    this.store.pipe(select('responsive'))
      .subscribe((devices: Devices) => {
        this.devices = devices;
      })
    //console.log(this.authService.currentUserValue)
  };

  public reloadBoards() {
    this.attempt = 0;
    this.getBoards();
  }
  private async getBoards(): Promise<void> {
    this.cards = await this.boardService.getAll().toPromise();
    this.loading = this.cards.length == 0;
    if (!this.cards.length && this.attempt <= 2) {
      setTimeout(() => {
        this.getBoards();
        this.attempt++;
      }, 3000);
    } else {
      this.loading = false;
    }
  }
  public editBoard(board) {
    this.openModalBoard(board)
  };
  public deleteBoard(board) {
    this.confirm.open(`Deseja excluir o board ${board.title}?`)
      .then((evt) => {
        if (evt) {
          this.boardService.delete(board.id)
            .pipe(first())
            .subscribe(() => this.onSubmited('success', 'Board excluido'))
        }
      });
  };
  private onSubmited(type: string, message: string) {
    this.toast.show(message, {
      delay: 2500,
      autohide: true,
      type: type
    })
    this.getBoards();
  }
  public openModalBoard(board) {
    const modalRef = this.modalService.open(ModalNewBoardComponent, this.modalOptions);
    modalRef.componentInstance.board = board;
    modalRef.result.then((result) => {
      if (result.id) {
        this.boardService.update(result)
          .pipe(first())
          .subscribe(res => this.onSubmited('success', 'Board atualizado'))
      }
      this.getBoards();
    })
      .catch(err => console.log(err))
  };

}
