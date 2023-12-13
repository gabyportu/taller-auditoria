import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBoxComponent } from './combo-box.component';

describe('ComboBoxComponent', () => {
  let component: ComboBoxComponent;
  let fixture: ComponentFixture<ComboBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComboBoxComponent]
    });
    fixture = TestBed.createComponent(ComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
