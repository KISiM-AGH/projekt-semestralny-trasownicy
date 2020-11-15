import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinelabelComponent } from './linelabel.component';

describe('LinelabelComponent', () => {
  let component: LinelabelComponent;
  let fixture: ComponentFixture<LinelabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinelabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinelabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
