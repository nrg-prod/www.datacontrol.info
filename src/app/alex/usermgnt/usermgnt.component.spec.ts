import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermgntComponent } from './usermgnt.component';

describe('UsermgntComponent', () => {
  let component: UsermgntComponent;
  let fixture: ComponentFixture<UsermgntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermgntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermgntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
