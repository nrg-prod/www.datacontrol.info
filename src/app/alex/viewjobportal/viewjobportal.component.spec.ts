import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjobportalComponent } from './viewjobportal.component';

describe('ViewjobportalComponent', () => {
  let component: ViewjobportalComponent;
  let fixture: ComponentFixture<ViewjobportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewjobportalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewjobportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
