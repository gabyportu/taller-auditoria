import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tap1Component } from './tap1.component';

describe('Tap1Component', () => {
  let component: Tap1Component;
  let fixture: ComponentFixture<Tap1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tap1Component]
    });
    fixture = TestBed.createComponent(Tap1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
