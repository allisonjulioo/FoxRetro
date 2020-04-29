import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {
  @Input() public qnt: number = 1;
  cards: number[];

  constructor() {
  }

  ngOnInit(): void {
    this.cards = Array(this.qnt).fill(4);
  }

}
