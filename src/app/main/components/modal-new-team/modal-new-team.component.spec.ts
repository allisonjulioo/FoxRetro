import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewTeamComponent } from './modal-new-team.component';

describe('ModalNewTeamComponent', () => {
  let component: ModalNewTeamComponent;
  let fixture: ComponentFixture<ModalNewTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
