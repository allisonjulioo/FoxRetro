import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewCardComponent } from './modal-new-card.component';

describe('NewCardComponent', () => {
  let component: ModalNewCardComponent;
  let fixture: ComponentFixture<ModalNewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
