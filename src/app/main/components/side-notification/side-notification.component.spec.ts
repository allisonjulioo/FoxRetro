import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNotificationComponent } from './side-notification.component';

describe('SideNotificationComponent', () => {
  let component: SideNotificationComponent;
  let fixture: ComponentFixture<SideNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
