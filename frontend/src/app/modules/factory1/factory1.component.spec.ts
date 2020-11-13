import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Factory1Component } from './factory1.component';

describe('Factory1Component', () => {
  let component: Factory1Component;
  let fixture: ComponentFixture<Factory1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Factory1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Factory1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
