import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Factory2Component } from './factory2.component';

describe('Factory2Component', () => {
  let component: Factory2Component;
  let fixture: ComponentFixture<Factory2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Factory2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Factory2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
