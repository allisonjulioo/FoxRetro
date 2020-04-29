import { createAction, props } from '@ngrx/store'

enum ActionTypes {
  Device = 'DEVICE',
}
export const resposive = createAction(
  ActionTypes.Device,
  props<{
    mobile: boolean,
    tablet: boolean,
    desktop: boolean,
  }>()
)



