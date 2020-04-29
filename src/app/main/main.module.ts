import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MainRoutingModule } from './main-routing.module';
import { ConfirmModule } from './../utils/confirm/confirm.module';
import { ButtonModule } from './../utils/button/button.module';
import { ToastsModule } from './../utils/toasts/toasts.module';
import { SkeletonModule } from '../utils/skeleton/skeleton.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { SearchModule } from './../utils/search/search.module';
import { InlineEditorModule } from '../utils/inline-editor/inline-editor.module';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ColorsDirective } from '../directives/colors.directive';

import { MainComponent } from './main.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SideNotificationComponent } from './components/side-notification/side-notification.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { KanbanCardComponent } from './components/kanban-card/kanban-card.component';
import { ModalNewBoardComponent } from './components/modal-new-board/modal-new-board.component';
import { BoardCardComponent } from './components/board-card/board-card.component'; 
import { AvatarModule } from '../utils/avatar/avatar.module';
import { AnalyticsComponent } from './views/analytics/analytics.component';
import { ModalNewCardComponent } from './components/modal-new-card/modal-new-card.component';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';

import { BoardsComponent } from './views/boards/boards.component';
import { TeamsComponent } from './views/teams/teams.component';
import { SingleBoardComponent } from './views/single-board/single-board.component';
import { ProfileComponent } from './views/profile/profile.component';

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
  ],
  imports: [
    AvatarModule,
    BrowserModule,
    ConfirmModule,
    ToastsModule,
    SearchModule,
    ButtonModule,
    SkeletonModule,
    ColorPickerModule,
    MainRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    DeviceDetectorModule,
    InlineEditorModule
  ],
  providers: [
    DeviceDetectorService,
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
