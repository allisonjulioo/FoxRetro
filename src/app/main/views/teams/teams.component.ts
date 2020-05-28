import { Component, OnInit } from '@angular/core';
import { Devices } from 'src/app/models/devices/devices';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styles: [':host { width: 100%;}'],
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public devices: Devices;
  public page: Number = 1;

  constructor(private store: Store<{ responsive: {} }>, ) { }

  ngOnInit(): void {
    this.store.pipe(select('responsive'))
      .subscribe((devices: Devices) => {
        this.devices = devices;
      })
    //console.log(this.authService.currentUserValue)
  };

}
