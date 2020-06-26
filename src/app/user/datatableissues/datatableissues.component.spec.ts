import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableissuesComponent } from './datatableissues.component';

describe('DatatableissuesComponent', () => {
  let component: DatatableissuesComponent;
  let fixture: ComponentFixture<DatatableissuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableissuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
