import { Component, OnInit } from '@angular/core';
import { ColumnsService } from './../../../services/columns/columns.service';
import { BoardsService } from './../../../services/boards/boards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from './../../../models/columns/columns';
import { Boards } from './../../../models/boards/boards';
import { update } from '../../../store/actions/updateColumn.actions';
import { Store, select } from '@ngrx/store';
import { ToastService } from './../../../services/toasts/toasts.service';
import { first } from 'rxjs/operators';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { Devices } from 'src/app/models/devices/devices';

@Component({
  selector: 'single-board',
  templateUrl: './single-board.component.html',
  styles: [':host { width: 100%;}'],
  styleUrls: ['./single-board.component.scss']
})
export class SingleBoardComponent implements OnInit {
  columns: Array<Column>;
  board: Boards;
  loading: boolean = false;
  devices: Devices;
  defaultColumn: Object = {
    title: 'Default',
    color: '#0095ff',
  }
  boardId: number = this.route.snapshot.params['id'];

  constructor(
    private boardService: BoardsService,
    private route: ActivatedRoute,
    private store: Store<{ update: number, responsive: {} }>,
    private toast: ToastService,
    private router: Router,
    private confirm: ConfirmService,
    private columnService: ColumnsService) {
  }
  ngOnInit(): void {
    this.store.pipe(select('update'))
      .subscribe(res => {
        this.getColumns(this.boardId);
      })
    this.store.pipe(select('responsive'))
      .subscribe((devices: Devices) => {
        this.devices = devices;
      })
  }

  public addColumn() {
    this.loading = true;
    this.columnService.create(this.defaultColumn, this.boardId)
      .subscribe((res: any) => {
        this.store.dispatch(update())
        this.loading = false;
      })
  }

  private getColumns(id: number) {
    this.columnService.getAll(id)
      .subscribe((res: any) => {
        this.board = res
      })
  }

  public editBoard(board: Boards, evt: string) {
    if (board.title !== evt) {
      board.title = evt;
      this.boardService.update(board)
        .subscribe((res: any) => this.onSubmited('success', res.message))
    }
  }
  public deleteBoard(board: Boards) {
    this.confirm.open(`Deseja excluir o board ${board.title}?`)
      .then((evt) => {
        if (evt) {
          this.boardService.delete(board.id)
            .pipe(first())
            .subscribe(res => {
              this.onSubmited('success', 'Board excluido')
              this.router.navigate(['/main/boards'])
            },
              error => this.onSubmited('error', 'Algo deu errado!'))
        }
      });
  }
  private onSubmited(type: string, message: string) {
    this.toast.show(message, {
      delay: 2500,
      autohide: true,
      type: type
    })
  }

}
