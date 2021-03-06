import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNewWordComponent } from './moda-new-word.component';


describe('ModalNewWordComponent', () => {
  let component: ModalNewWordComponent;
  let fixture: ComponentFixture<ModalNewWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
