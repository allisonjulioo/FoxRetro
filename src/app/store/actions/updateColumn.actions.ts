import { createAction } from '@ngrx/store'

enum ActionTypes {
  Update = 'UPDATE',
}

export const update = createAction(
  ActionTypes.Update
)



