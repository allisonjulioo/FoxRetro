import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BoardsService } from 'src/app/services/boards/boards.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styles: [':host { min-width: 400px;}'],
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() public search: EventEmitter<string> = new EventEmitter();
  private searchChanged: Subject<string> = new Subject<string>();
  public text: string;
  constructor(private boardService: BoardsService) {
    this.searchChanged
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => this.search.emit(value));
  }

  ngOnInit(): void {}

  public onKeyPress(value: string) {
    this.searchChanged.next(value);
  }
  public onSubmit(value: string) {
    this.search.emit(value);
  }
}
