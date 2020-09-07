import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Column } from 'src/app/models/columns/columns';
import { Devices } from 'src/app/models/devices/devices';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { update } from '../../../store/actions/updateColumn.actions';
import { ColumnsService } from './../../../services/columns/columns.service';
import { ModalNewCardComponent } from './../modal-new-card/modal-new-card.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, OnChanges, OnDestroy {
  @Input() columns: Array<Column>;
  public boardId: number = this.route.snapshot.params.id;
  public devices: Devices;
  public selectedColumn: Column;
  public modalOptions = {
    centered: true,
    windowClass: 'animated fadeIn',
  };

  constructor(
    private modalService: NgbModal,
    private confirm: ConfirmService,
    private route: ActivatedRoute,
    private store: Store<{ responsive: {} }>,
    private columnService: ColumnsService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select('responsive')).subscribe((devices: Devices) => {
      this.devices = devices;
    });
  }
  ngOnChanges(evt) {
    if (this.columns?.length && (this.devices.mobile || this.devices.tablet)) {
      this.selectedColumn = this.columns[0];
      if (!this.devices.desktop) {
        document.querySelector(
          'body'
        ).style.background = this.selectedColumn.color;
      }
    }
  }
  ngOnDestroy() {
    document.querySelector('body').style.background = '#f8f9fd';
  }
  selectColumn(column: Column) {
    this.selectedColumn = column;
    if (!this.devices.desktop) {
      document.querySelector(
        'body'
      ).style.background = this.selectedColumn.color;
    }
  }
  public setColor(column: Column) {
    if (this.devices.desktop) {
      return column.color;
    }
    return '#fff';
  }
  widthColumn() {
    if (this.devices.mobile || this.devices.tablet) {
      return `${100 / this.columns.length} '%'`;
    }
    return '100%';
  }
  public editColumn(column: Column, evt: string) {
    column.title = evt;
    this.columnService.update(column).subscribe((res) => {
      if (res) {
        this.store.dispatch(update());
      }
    });
  }

  public deleteColumn(column: Column) {
    this.confirm
      .open(`Deseja excluir a coluna ${column.title}?`)
      .then((evt) => {
        if (evt) {
          this.columnService.delete(column.id).subscribe((res) => {
            this.store.dispatch(update());
          });
        }
      });
  }

  public addNewCard(column: Column) {
    const modalRef = this.modalService.open(
      ModalNewCardComponent,
      this.modalOptions
    );
    modalRef.componentInstance.column = column;
    modalRef.result
      .then((result) => {
        if (result) {
          this.store.dispatch(update());
        }
      })
      .catch((err) => {});
  }
}
