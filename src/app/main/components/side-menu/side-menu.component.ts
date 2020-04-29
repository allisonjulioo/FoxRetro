import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { Store, select } from '@ngrx/store';
import { menu } from 'src/app/store/actions/sideMenu.actions';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input() user: User;
  isOpened$: boolean = true;
  constructor(
    private store: Store<{ menu: boolean }>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select('menu'))
      .subscribe((data: any) => {
        const { isOpened } = data
        this.isOpened$ = isOpened;
        if (this.isOpened$) {
          setTimeout(() => {
            const element = document.querySelector('.backdrop');
            Hammer(element).on("swipeleft", (e) => {
              this.closeMenu()
            });
          }, 100);
        }

      })

  }
  closeMenu() {
    document.querySelector('.mobile-menu').classList.add('fadeOutLeft')
    document.querySelector('.backdrop').classList.add('fadeOut')
    setTimeout(() => this.store.dispatch(menu({ isOpened: false })), 300);

  }

}
