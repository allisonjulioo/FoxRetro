import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBoardComponent } from './single-board.component';

describe('SingleBoardComponent', () => {
  let component: SingleBoardComponent;
  let fixture: ComponentFixture<SingleBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
