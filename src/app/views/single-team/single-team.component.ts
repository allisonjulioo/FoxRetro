import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event } from '@angular/router';
import { Teams } from 'src/app/models/teams/teams';
import { TeamServiceService } from 'src/app/services/teams/team-serivice.service';

@Component({
  selector: 'single-team',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.scss'],
})
export class SingleTeamComponent implements OnInit {
  public team: Teams;
  private teamId: string = this.route.snapshot.params.id;
  constructor(
    private teamServiceService: TeamServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBoard();
  }

  public editTeam(team: Teams, event: Event) {
    console.log(team, event);
  }
  private getBoard() {
    this.teamServiceService
      .find(this.teamId)
      .subscribe((team) => (this.team = team));
  }
}
