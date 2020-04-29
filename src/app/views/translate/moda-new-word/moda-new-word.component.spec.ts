import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaNewWordComponent } from './moda-new-word.component';

describe('ModaNewWordComponent', () => {
  let component: ModaNewWordComponent;
  let fixture: ComponentFixture<ModaNewWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaNewWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaNewWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
