import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() public name: String;
  @Input() public initials: String;
  @Input() public color: String;
  @Input() public role: String;
  @Input() public full: Boolean = false;
  @Input() public dark: Boolean = false;
  @Input() public lg: Boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  getInitials() {
    if (this.name && this.name.length > 1) {
      const n = this.name.split(' ');
      if (n.length > 1) {
        return `${n[0][0]}${n[1][0]}`
      }
      return `${n[0][0]}${n[0][1]}`;
    }
  }
}
