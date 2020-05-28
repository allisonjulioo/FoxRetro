import { Component } from '@angular/core';
import * as Hammer from 'hammerjs';
import { ResponsiveService } from './services/responsive/responsive.service';
import { Store, select } from '@ngrx/store';
import { menu } from './store/actions/sideMenu.actions';
import { Devices } from './models/devices/devices';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)',
    '(window:load)': 'onResize($event)'
  }
})
export class AppComponent {
  device: Devices;
  constructor(
    private responsive: ResponsiveService,
    public store: Store<{ responsive: Object, menu: boolean }>
  ) {

  }
  ngOnInit(): void {
    this.store.pipe(select('responsive'))
      .subscribe((devices: Devices) => this.device = devices)

    const element = document.getElementById('triggerMenu');
    Hammer(element).on("swiperight", (e) => {
      this.store.dispatch(menu({ isOpened: true }))
    });
  }

  private onResize() {
    this.responsive.getWidth()
  }
}
