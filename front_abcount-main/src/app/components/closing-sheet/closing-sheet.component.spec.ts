import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingSheetComponent } from './closing-sheet.component';

describe('ClosingSheetComponent', () => {
  let component: ClosingSheetComponent;
  let fixture: ComponentFixture<ClosingSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosingSheetComponent]
    });
    fixture = TestBed.createComponent(ClosingSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
