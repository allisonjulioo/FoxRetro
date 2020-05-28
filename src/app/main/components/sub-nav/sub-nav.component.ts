import { Component, OnInit } from '@angular/core';
import { Devices } from 'src/app/models/devices/devices';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss']
})
export class SubNavComponent implements OnInit {
  device: Devices;
  bg: string;
  constructor(private store: Store<{ responsive: Object, menu: boolean }>) {}

  ngOnInit(): void {
    this.store.pipe(select('responsive'))
      .subscribe((devices: Devices) => {
        this.device = devices;
        if (this.device.mobile || this.device.tablet) {
          this.bg = 'background';
        }
        else if (this.device.desktop) {
          this.bg = ''
        }
      })
  }

}
