import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingVoucherAddComponent } from './accounting-voucher-add.component';

describe('AccountingVoucherAddComponent', () => {
  let component: AccountingVoucherAddComponent;
  let fixture: ComponentFixture<AccountingVoucherAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingVoucherAddComponent]
    });
    fixture = TestBed.createComponent(AccountingVoucherAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
