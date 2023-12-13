import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tap4Component } from './tap4.component';

describe('Tap4Component', () => {
  let component: Tap4Component;
  let fixture: ComponentFixture<Tap4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tap4Component]
    });
    fixture = TestBed.createComponent(Tap4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
