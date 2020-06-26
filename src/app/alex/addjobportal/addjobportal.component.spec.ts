import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjobportalComponent } from './addjobportal.component';

describe('AddjobportalComponent', () => {
  let component: AddjobportalComponent;
  let fixture: ComponentFixture<AddjobportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddjobportalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddjobportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
