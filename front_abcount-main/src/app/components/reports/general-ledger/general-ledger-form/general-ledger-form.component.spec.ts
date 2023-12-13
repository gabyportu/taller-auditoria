import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLedgerFormComponent } from './general-ledger-form.component';

describe('GeneralLedgerFormComponent', () => {
  let component: GeneralLedgerFormComponent;
  let fixture: ComponentFixture<GeneralLedgerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralLedgerFormComponent]
    });
    fixture = TestBed.createComponent(GeneralLedgerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
