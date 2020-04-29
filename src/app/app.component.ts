import { Component } from '@angular/core';
import { ResposiveService } from './services/responsive/resposive.service';
import * as Hammer from 'hammerjs';
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
    private resposive: ResposiveService,
    public store: Store<{ resposive: Object, menu: boolean }>
  ) {

  }
  ngOnInit(): void {
    this.store.pipe(select('resposive'))
      .subscribe((devices: Devices) => this.device = devices)

    const element = document.getElementById('triggerMenu');
    Hammer(element).on("swiperight", (e) => {
      this.store.dispatch(menu({ isOpened: true }))
    });
  }

  private onResize() {
    this.resposive.getWidth()
  }
}
