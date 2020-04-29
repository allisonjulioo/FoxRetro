import { createAction, props } from '@ngrx/store'

enum ActionTypes {
  Notification = 'NOTIFICATION',
}
export const notification = createAction(
  ActionTypes.Notification,
  props<{ isOpened: boolean }>()
)
