import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Devices } from 'src/app/models/devices/devices';
import { Teams } from 'src/app/models/teams/teams';
import { TeamServiceService } from 'src/app/services/teams/team-serivice.service';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { ModalNewTeamComponent } from '../../components/modal-new-team/modal-new-team.component';

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styles: [':host { width: 100%;}'],
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  public devices: Devices;
  public loading: boolean;
  public attempt = 0;
  public cards: Teams[] = [];
  public page = 1;
  public modalOptions = {
    windowClass: 'animated fadeIn faster',
    backdropClass: 'modal-primary-backdrop',
  };
  constructor(
    private modalService: NgbModal,
    private store: Store<{ responsive: {} }>,
    private teamService: TeamServiceService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getTeams();
    this.store.pipe(select('responsive')).subscribe((devices: Devices) => {
      this.devices = devices;
    });
  }
  public async getTeams(): Promise<void> {
    this.loading = true;
    this.cards = await this.teamService.get().toPromise();
    this.loading = this.cards.length === 0;
    if (!this.cards.length && this.attempt <= 2) {
      setTimeout(() => {
        this.getTeams();
        this.attempt++;
      }, 3000);
    } else {
      this.loading = false;
    }
  }
  public editTeam(team: Teams): void {
    this.openModalTeam(team);
  }
  public openModalTeam(team?: Teams) {
    const modalRef = this.modalService.open(
      ModalNewTeamComponent,
      this.modalOptions
    );
    modalRef.componentInstance.team = team;
    modalRef.result
      .then((result) => {
        if (result.id) {
          this.onSubmitted('success', 'Time atualizado com sucesso');
        }
      })
      .catch((err: any) => console.log(err));
  }
  public deleteTeam(team?: Teams): void {
    this.teamService
      .delete(team.id)
      .subscribe(({ message }: { message: string }) => {
        console.log(message);
        this.cards = this.cards.filter((card) => card !== team);
        this.onSubmitted('success', message);
        if (this.cards.length === 0) {
          this.getTeams();
        }
      });
  }
  private onSubmitted(type: string, message: string) {
    this.toast.show(message, {
      delay: 2500,
      autohide: true,
      type,
    });
    this.getTeams();
  }
  public onSubmitSearch(value: string) {
    const data = {
      key: 'title',
      value,
    };
    this.teamService.search(data).subscribe((cards) => (this.cards = cards));
  }
}
