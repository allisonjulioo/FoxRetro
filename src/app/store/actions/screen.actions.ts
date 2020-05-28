import { createAction, props } from '@ngrx/store'

enum ActionTypes {
  Device = 'DEVICE',
}
export const responsive = createAction(
  ActionTypes.Device,
  props<{
    mobile: boolean,
    tablet: boolean,
    desktop: boolean,
  }>()
)



