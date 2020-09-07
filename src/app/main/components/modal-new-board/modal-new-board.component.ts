import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Teams } from 'src/app/models/teams/teams';
import { TeamServiceService } from 'src/app/services/teams/team-serivice.service';
import { BoardsService } from './../../../services/boards/boards.service';
import { ToastService } from './../../../services/toasts/toasts.service';

@Component({
  selector: 'v-modal-new-board',
  templateUrl: './modal-new-board.component.html',
  styleUrls: ['./modal-new-board.component.scss'],
})
export class ModalNewBoardComponent implements OnInit {
  @Input() board;
  boardForm: FormGroup;
  teams: Teams[];
  loading: boolean;
  submitted: boolean;
  get a() {
    return this.boardForm.controls;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private teamService: TeamServiceService,
    public boardService: BoardsService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.boardForm = this.fb.group({
      id: [this.board?.id],
      title: [
        this.board?.title,
        [Validators.required, Validators.minLength(3)],
      ],
      team_id: [this.board?.team_id],
      limit_votes: [
        this.board?.limit_votes || 4,
        [Validators.required, Validators.pattern('[0-9]*')],
      ],
    });
    this.getTeams();
  }
  public async getTeams(): Promise<void> {
    this.teams = await this.teamService.get().toPromise();
  }
  public saveBoard() {
    this.loading = this.submitted = true;
    if (this.boardForm.invalid) {
      this.loading = false;
      return;
    }
    this.boardService[this.board?.id ? 'update' : 'create'](
      this.boardForm.value
    )
      .pipe(first())
      .subscribe(
        () => {
          delete this.boardForm.value.id;
          this.activeModal.close(this.boardForm.value);
        },
        () => this.onSubmitted('error', 'Ops! algo deu errado')
      );
  }
  private onSubmitted(type: string, message: string) {
    this.loading = false;
    this.toast.show(message, {
      delay: 2500,
      autohide: true,
      type,
    });
  }
}
