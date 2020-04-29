import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'k-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() public customClass: String = '';
  @Input() public type: String = 'primary';
  @Input() public label: String = 'primary';
  @Input() public loading: Boolean = false;
  @Input() public disabled: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
