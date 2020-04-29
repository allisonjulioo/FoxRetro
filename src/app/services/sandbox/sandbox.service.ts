import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {
  mobile$ = this.store.select(state => state.screen.mobile);
  tablet$ = this.store.select(state => state.screen.tablet);
  desktop$ = this.store.select(state => state.screen.desktop);

  constructor(private store: Store<ApplicationState>) {
  }

  setWindowWidth(windowWidth: number): void {
    this.store.dispatch(new SetScreen(windowWidth));
  }


}