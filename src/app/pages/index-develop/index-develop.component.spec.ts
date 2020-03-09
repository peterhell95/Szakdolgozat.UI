import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDevelopComponent } from './index-develop.component';

describe('IndexDevelopComponent', () => {
  let component: IndexDevelopComponent;
  let fixture: ComponentFixture<IndexDevelopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexDevelopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDevelopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
