import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularButtonComponent } from './circular-button.component';

describe('CircularButtonComponent', () => {
  let component: CircularButtonComponent;
  let fixture: ComponentFixture<CircularButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircularButtonComponent]
    });
    fixture = TestBed.createComponent(CircularButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
