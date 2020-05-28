import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { notification } from 'src/app/store/actions/notifications.actions';
import { Devices } from 'src/app/models/devices/devices';

@Component({
  selector: 'side-notification',
  templateUrl: './side-notification.component.html',
  styleUrls: ['./side-notification.component.scss']
})
export class SideNotificationComponent implements OnInit {
  @Input() user: User;
  isOpened$: Observable<boolean>;
  device$: Devices;
  constructor(
    private store: Store<{
      notification: boolean,
      responsive: Devices,
    }>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select('responsive'))
      .subscribe((devices: Devices) => {
        this.device$ = devices;
      })

    this.store.pipe(select('notification'))
      .subscribe((data: any) => {
        const { isOpened } = data
        this.isOpened$ = isOpened;
      })
  }
  public closeMenu() {
    document.querySelector('.mobile-notification').classList.add(this.device$.desktop ? 'fadeOutRight' : 'fadeOutDown')
    document.querySelector('.backdrop').classList.add('fadeOut')
    setTimeout(() => this.store.dispatch(notification({ isOpened: false })), 300);

  }

}
