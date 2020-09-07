import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Devices } from 'src/app/models/devices/devices';
import { User } from 'src/app/models/user/user';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { notification } from 'src/app/store/actions/notifications.actions';
import { menu } from 'src/app/store/actions/sideMenu.actions';
import { UserService } from './../../../services/user/user.service';

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  user_id = this.cookie.get('uid');
  user: User;
  device$: Devices;
  opened: boolean;
  isOpened$: Observable<boolean>;
  isVisible: boolean;

  constructor(
    private router: Router,
    private confirm: ConfirmService,
    public route: ActivatedRoute,
    private cookie: CookieService,
    private userService: UserService,
    private store: Store<{
      responsive: Devices;
      menu: boolean;
      notification: boolean;
    }>
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isVisible =
          event.url.split('/').includes('board') ||
          event.url.split('/').includes('team');
      }
    });
  }

  ngOnInit(): void {
    this.userService
      .getById(this.user_id)
      .subscribe((user) => (this.user = user));

    this.store.pipe(select('responsive')).subscribe((devices: Devices) => {
      this.device$ = devices;
    });
    this.store.pipe(select('menu')).subscribe((data: any) => {
      this.isOpened$ = data.isOpened;
    });
  }
  public openMenu() {
    this.store.dispatch(menu({ isOpened: true }));
  }
  public openNotification() {
    this.store.dispatch(notification({ isOpened: true }));
  }
  public logout() {
    this.confirm.open('Deseja sair do sistema?').then((evt) => {
      if (evt) {
        this.router.navigate(['/auth/login']).then(() => {
          this.cookie.deleteAll();
        });
      }
    });
  }
  public changeState(state) {
    this.router.navigate([state]);
  }
}
