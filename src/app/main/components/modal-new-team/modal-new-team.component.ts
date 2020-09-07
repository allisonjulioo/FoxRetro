import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Teams } from 'src/app/models/teams/teams';
import { TeamServiceService } from 'src/app/services/teams/team-serivice.service';
import { ToastService } from 'src/app/services/toasts/toasts.service';

@Component({
  selector: 'modal-new-team',
  templateUrl: './modal-new-team.component.html',
  styleUrls: ['./modal-new-team.component.scss'],
})
export class ModalNewTeamComponent implements OnInit {
  @Input() team: Teams;
  teamForm: FormGroup;
  teams: Teams[];
  loading: boolean;
  submitted: boolean;
  get a() {
    return this.teamForm.controls;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private teamService: TeamServiceService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      id: [this.team?.id],
      title: [this.team?.title, [Validators.required, Validators.minLength(3)]],
      description: [
        this.team?.description,
        [Validators.required, Validators.minLength(3)],
      ],
      logo: [this.team?.logo, [Validators.required, Validators.minLength(3)]],
    });
    this.getTeams();
  }
  public async getTeams(): Promise<void> {
    this.teams = await this.teamService.get().toPromise();
  }
  public saveTeam() {
    this.loading = this.submitted = true;
    if (this.teamForm.invalid) {
      this.loading = false;
      return;
    }
    this.teamService[this.team?.id ? 'update' : 'create'](this.teamForm.value)
      .pipe(first())
      .subscribe(
        (res) => this.activeModal.close(res),
        (error) => this.onSubmitted('error', 'Ops! algo deu errado')
      );
  }
  private onSubmitted(type: string, message: string) {
    console.log(message);
    this.loading = false;
    this.toast.show(message, {
      delay: 2500,
      autohide: true,
      type,
    });
  }
}
