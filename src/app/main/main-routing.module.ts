import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { BoardsComponent } from './views/boards/boards.component';
import { TeamsComponent } from './views/teams/teams.component';
import { SingleBoardComponent } from './views/single-board/single-board.component';
import { AnalyticsComponent } from './views/analytics/analytics.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { ProfileComponent } from './views/profile/profile.component';


const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'boards', pathMatch: 'full', canActivate: [AuthGuard], },
      { path: 'boards', component: BoardsComponent, pathMatch: 'full' },
      { path: 'teams', component: TeamsComponent, pathMatch: 'full' },
      { path: 'analytics', component: AnalyticsComponent, pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
      { path: 'board/:id', component: SingleBoardComponent, pathMatch: 'full', data: { title: 'Boards' } },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
