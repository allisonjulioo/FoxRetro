import { createReducer, on } from '@ngrx/store'
import { INITIAL_STATE } from '../state/updateColumn.state';
import { update } from '../actions/updateColumn.actions';


export const reducer = createReducer(
  INITIAL_STATE,
  on(update, state => ({
    ...state,
  })),
)