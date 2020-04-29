import { createReducer, on } from '@ngrx/store'
import { MENU } from '../state/sideMenu.state';
import { menu } from '../actions/sideMenu.actions';


export const reducer = createReducer(
  MENU,
  on(menu, (state, { isOpened }) => ({
    ...state,
    isOpened: isOpened,
  })),
) 