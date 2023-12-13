import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingVoucherViewComponent } from './accounting-voucher-view.component';

describe('AccountingVoucherViewComponent', () => {
  let component: AccountingVoucherViewComponent;
  let fixture: ComponentFixture<AccountingVoucherViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingVoucherViewComponent]
    });
    fixture = TestBed.createComponent(AccountingVoucherViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
