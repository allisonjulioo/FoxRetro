import { createAction, props } from '@ngrx/store'

enum ActionTypes {
  Menu = 'MENU',
}
export const menu = createAction(
  ActionTypes.Menu,
  props<{ isOpened: boolean }>()
)
