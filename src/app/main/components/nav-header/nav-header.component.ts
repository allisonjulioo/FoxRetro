import { Component, OnInit } from '@angular/core';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UserService } from './../../../services/user/user.service';
import { Devices } from 'src/app/models/devices/devices';
import { Store, select } from '@ngrx/store';
import { menu } from 'src/app/store/actions/sideMenu.actions';
import { notification } from 'src/app/store/actions/notifications.actions';

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  user_id: number = parseInt(this.cookie.get('uid'));
  user: any = { name: String };
  device$: Devices;
  opened: boolean = false;
  isOpened$: Observable<boolean>;
  isKanban: boolean;

  constructor(
    private router: Router,
    private confirm: ConfirmService,
    public route: ActivatedRoute,
    private cookie: CookieService,
    private userService: UserService,
    private store: Store<
      {
        responsive: Object,
        menu: boolean,
        notification: boolean,
      }>
  ) {
    router.events
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.isKanban = event.url
            .split('/')
            .includes('board');
        }
      });
  }

  ngOnInit(): void {
    this.userService.getById(this.user_id)
      .subscribe(user => this.user = user)


    this.store.pipe(select('responsive'))
      .subscribe((devices: Devices) => {
        this.device$ = devices;
      })
    this.store.pipe(select('menu'))
      .subscribe((data: any) => {
        this.isOpened$ = data.isOpened;

      })
  }
  public openMenu() {
    this.store.dispatch(menu({ isOpened: true }))
  }
  public openNotification() {
    this.store.dispatch(notification({ isOpened: true }))
  }
  public logout() {
    this.confirm.open('Deseja sair do sistema?')
      .then((evt) => {
        if (evt) {
          this.router.navigate(['/auth/login']).then(() => {
            this.cookie.deleteAll()
          })
        }
      });
  }
  public changeState(state) {
    this.router.navigate([state])
  }

}
