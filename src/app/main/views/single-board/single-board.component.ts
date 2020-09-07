import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { Devices } from 'src/app/models/devices/devices';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { update } from '../../../store/actions/updateColumn.actions';
import { Boards } from './../../../models/boards/boards';
import { Column } from './../../../models/columns/columns';
import { BoardsService } from './../../../services/boards/boards.service';
import { ColumnsService } from './../../../services/columns/columns.service';
import { ToastService } from './../../../services/toasts/toasts.service';

@Component({
  selector: 'single-board',
  templateUrl: './single-board.component.html',
  styles: [':host { width: 100%;}'],
  styleUrls: ['./single-board.component.scss'],
})
export class SingleBoardComponent implements OnInit {
  columns: Column[];
  board: Boards;
  loading: boolean;
  devices: Devices;
  boardId: string = this.route.snapshot.params.id;
  column: Column = {
    title: 'Default',
    color: '#0095ff',
    board_id: this.boardId,
  };

  constructor(
    private boardService: BoardsService,
    private route: ActivatedRoute,
    private store: Store<{ update: number; responsive: Devices }>,
    private toast: ToastService,
    private router: Router,
    private confirm: ConfirmService,
    private columnService: ColumnsService
  ) {}
  ngOnInit(): void {
    this.store.pipe(select('update')).subscribe((res) => {
      this.getColumnsByBoardId(this.boardId);
      this.getBoard(this.boardId);
    });
    this.store.pipe(select('responsive')).subscribe((devices: Devices) => {
      this.devices = devices;
    });
  }

  private getBoard(id: string) {
    this.boardService
      .find(this.boardId)
      .subscribe((board) => (this.board = board));
  }
  public addColumn() {
    this.loading = true;
    this.columnService.create(this.column).subscribe(() => {
      this.store.dispatch(update());
      this.loading = false;
    });
  }

  private getColumnsByBoardId(id: string) {
    this.columnService.getColumnsByBoardId(id).subscribe((columns) => {
      this.columns = columns;
    });
  }

  public editBoard(board: Boards, evt: string) {
    if (board.title !== evt) {
      board.title = evt;
      this.boardService
        .update(board)
        .subscribe((res: any) => this.onSubmited('success', res.message));
    }
  }
  public deleteBoard(board: Boards) {
    this.confirm.open(`Deseja excluir o board ${board.title}?`).then((evt) => {
      if (evt) {
        this.boardService
          .delete(board.id)
          .pipe(first())
          .subscribe(
            () => {
              this.onSubmited('success', 'Board excluido');
              this.router.navigate(['/main/boards']);
            },
            (error) => this.onSubmited('error', 'Algo deu errado!')
          );
      }
    });
  }
  private onSubmited(type: string, message: string) {
    this.toast.show(message, {
      delay: 2500,
      autohide: true,
      type,
    });
  }
}
