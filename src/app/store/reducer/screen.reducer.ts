import { createReducer, on } from '@ngrx/store'
import { DEVICES } from '../state/screen.state';
import { resposive } from '../actions/screen.actions';


export const reducer = createReducer(
  DEVICES,
  on(resposive, (state, { mobile, tablet, desktop }) => ({
    ...state,
    mobile: mobile,
    tablet: tablet,
    desktop: desktop,
  })),
) 