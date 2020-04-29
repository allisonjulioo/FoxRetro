import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { I18nService } from '../services/i18n/i18n.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  activeRouter: string;

  constructor(private router: Router, public i18n: I18nService ) {
    router.events
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.activeRouter = this.setActiverouter(event.url)
        }
      });
  }
  setActiverouter(route: string): string {
    const caseRoute = r => route.split('/').includes(r)
    switch (true) {
      case caseRoute('login'):
        return 'login'
      case caseRoute('register'):
        return 'register'
      case caseRoute('remind'):
        return 'remind'
      default:
        return 'login'
    }
  }
  ngOnInit(): void {
  }

  public facebookAuth() {
    window.open("https://www.facebook.com", "_blank", "toolbar=no,scrollbars=yes,resizable=no,top=500,left=500,width=400,height=400");
  }

}
