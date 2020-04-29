import { Pipe, PipeTransform } from '@angular/core';
import { Boards } from '../models/boards/boards';

@Pipe({
  name: 'boardsFilter'
})
export class BoardsPipe implements PipeTransform {

  transform(boards: Boards[], filter: Boards): Boards[] {
    if (!boards || !filter) {
      return boards;
    }
    // filter boards array, boards which match and return true will be kept, false will be filtered out
    return boards.filter((board: Boards) => this.applyFilter(board, filter));
  }

  applyFilter(board: Boards, filter: Boards): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (board[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (board[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }

}
