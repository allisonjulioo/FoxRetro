import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { ModalNewBoardComponent } from '../../components/modal-new-board/modal-new-board.component';
import { BoardsService } from './../../../services/boards/boards.service';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { Boards } from 'src/app/models/boards/boards';
import { first } from 'rxjs/operators';
import { AuthService } from './../../../services/auth/auth.service';
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
    private authService: AuthService,
    private store: Store<{ resposive: {} }>, ) { }


  ngOnInit(): void {
    this.getBoards();
    this.store.pipe(select('resposive'))
      .subscribe((devices: Devices) => {
        this.devices = devices;
      })
    //console.log(this.authService.currentUserValue)
  };
  private getBoards() {
    this.boardService.getAll()
      .subscribe(cards => {
        this.cards = cards
      })
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
