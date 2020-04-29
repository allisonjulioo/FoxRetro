import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewBoardComponent } from './modal-new-board.component';

describe('ModalNewBoardComponent', () => {
  let component: ModalNewBoardComponent;
  let fixture: ComponentFixture<ModalNewBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
