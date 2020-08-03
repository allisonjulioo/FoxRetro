import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Devices } from '../models/devices/devices';
import { I18nService } from '../services/i18n/i18n.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  activeRouter: string;
  devices: Devices;

  constructor(
    private router: Router,
    public i18n: I18nService,
    private store: Store<{ responsive: {} }>) {
    router.events
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.activeRouter = this.setActiverouter(event.url);
        }
      });
    this.store.pipe(select('responsive'))
      .subscribe((devices: Devices) => {
        this.devices = devices;
      });
  }
  setActiverouter(route: string): string {
    const caseRoute = (r: string) => route.split('/').includes(r);
    switch (true) {
      case caseRoute('login'):
        return 'login';
      case caseRoute('register'):
        return 'register';
      case caseRoute('remind'):
        return 'remind';
      default:
        return 'login';
    }
  }
  ngOnInit(): void {
  }

  public facebookAuth() {
    window.open("https://www.facebook.com", "_blank", "toolbar=no,scrollbars=yes,resizable=no,top=500,left=500,width=400,height=400");
  }

}
