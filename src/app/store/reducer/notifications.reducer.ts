import { createReducer, on } from '@ngrx/store'
import { NOTIFICATION } from '../state/notifications.state';
import { notification } from '../actions/notifications.actions';


export const reducer = createReducer(
  NOTIFICATION,
  on(notification, (state, { isOpened }) => ({
    ...state,
    isOpened: isOpened,
  })),
) 