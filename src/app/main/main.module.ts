import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  NgbAlertModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgChartjsModule } from 'ng-chartjs';
import { ColorPickerModule } from 'ngx-color-picker';
import {
  DeviceDetectorModule,
  DeviceDetectorService,
} from 'ngx-device-detector';
import { environment } from '../../environments/environment';
import { ColorsDirective } from '../directives/colors.directive';
import { AuthGuard } from '../services/auth/auth.guard';
import { AvatarModule } from '../utils/avatar/avatar.module';
import { InlineEditorModule } from '../utils/inline-editor/inline-editor.module';
import { SkeletonModule } from '../utils/skeleton/skeleton.module';
import { ButtonModule } from './../utils/button/button.module';
import { ConfirmModule } from './../utils/confirm/confirm.module';
import { SearchModule } from './../utils/search/search.module';
import { ToastsModule } from './../utils/toasts/toasts.module';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { KanbanCardComponent } from './components/kanban-card/kanban-card.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { ModalNewBoardComponent } from './components/modal-new-board/modal-new-board.component';
import { ModalNewCardComponent } from './components/modal-new-card/modal-new-card.component';
import { ModalNewTeamComponent } from './components/modal-new-team/modal-new-team.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SideNotificationComponent } from './components/side-notification/side-notification.component';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';
import { TeamsCardComponent } from './components/teams-card/teams-card.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { AnalyticsComponent } from './views/analytics/analytics.component';
import { BoardsComponent } from './views/boards/boards.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SingleBoardComponent } from './views/single-board/single-board.component';
import { TeamsComponent } from './views/teams/teams.component';
import { SingleTeamComponent } from '../views/single-team/single-team.component';

@NgModule({
  declarations: [
    MainComponent,
    NavHeaderComponent,
    SideMenuComponent,
    BoardsComponent,
    TeamsComponent,
    SingleBoardComponent,
    KanbanComponent,
    KanbanCardComponent,
    ModalNewBoardComponent,
    BoardCardComponent,
    AnalyticsComponent,
    ColorsDirective,
    ModalNewCardComponent,
    SubNavComponent,
    ProfileComponent,
    SideNotificationComponent,
    TeamsCardComponent,
    ModalNewTeamComponent,
    SingleTeamComponent,
  ],
  imports: [
    AvatarModule,
    BrowserModule,
    ConfirmModule,
    NgChartjsModule,
    ToastsModule,
    SearchModule,
    ButtonModule,
    SkeletonModule,
    ColorPickerModule,
    MainRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    DeviceDetectorModule,
    InlineEditorModule,
  ],
  providers: [AuthGuard, DeviceDetectorService],
  bootstrap: [MainComponent],
})
export class MainModule {}
