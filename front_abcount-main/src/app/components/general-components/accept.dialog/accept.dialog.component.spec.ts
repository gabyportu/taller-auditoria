import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDialogComponent } from './accept.dialog.component';

describe('AcceptDialogComponent', () => {
  let component: AcceptDialogComponent;
  let fixture: ComponentFixture<AcceptDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptDialogComponent]
    });
    fixture = TestBed.createComponent(AcceptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
