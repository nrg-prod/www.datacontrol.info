import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewissuesComponent } from './viewissues.component';

describe('ViewissuesComponent', () => {
  let component: ViewissuesComponent;
  let fixture: ComponentFixture<ViewissuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewissuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
