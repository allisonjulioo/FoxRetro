import { Injectable, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Store } from '@ngrx/store';
import { responsive } from 'src/app/store/actions/screen.actions';
import { Devices } from 'src/app/models/devices/devices';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService implements OnInit {
  public devices: Devices = {
    mobile: this.device.isMobile(),
    tablet: this.device.isTablet(),
    desktop: this.device.isDesktop(),
  };

  constructor(
    public device: DeviceDetectorService,
    private store: Store<Devices>,
  ) { }

  ngOnInit(): void {
  }
  getWidth() {
    const size = window.innerWidth
    switch (true) {
      case size > 981:
        this.devices.desktop = true;
        this.devices.tablet = false;
        this.devices.mobile = false;
        break;
      case size < 981 && size > 768:
        this.devices.desktop = false;
        this.devices.tablet = true;
        this.devices.mobile = false;
        break;
      case size < 768:
        this.devices.desktop = false;
        this.devices.tablet = false;
        this.devices.mobile = true;
      default:
        this.devices
        break;
    }
    this.device.setDeviceInfo(window.navigator.userAgent);
    this.store.dispatch(responsive(
      this.devices
    ))
  }
}
