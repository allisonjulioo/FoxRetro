import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { SingleTeamComponent } from './../views/single-team/single-team.component';
import { MainComponent } from './main.component';
import { AnalyticsComponent } from './views/analytics/analytics.component';
import { BoardsComponent } from './views/boards/boards.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SingleBoardComponent } from './views/single-board/single-board.component';
import { TeamsComponent } from './views/teams/teams.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'boards', pathMatch: 'full' },
      { path: 'boards', component: BoardsComponent, pathMatch: 'full' },
      { path: 'teams', component: TeamsComponent, pathMatch: 'full' },
      { path: 'analytics', component: AnalyticsComponent, pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
      {
        path: 'board/:id',
        component: SingleBoardComponent,
        pathMatch: 'full',
        data: { title: 'Board' },
      },
      {
        path: 'team/:id',
        component: SingleTeamComponent,
        pathMatch: 'full',
        data: { title: 'Board' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
