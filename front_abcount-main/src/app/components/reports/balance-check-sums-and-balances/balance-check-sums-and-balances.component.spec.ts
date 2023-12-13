import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCheckSumsAndBalancesComponent } from './balance-check-sums-and-balances.component';

describe('BalanceCheckSumsAndBalancesComponent', () => {
  let component: BalanceCheckSumsAndBalancesComponent;
  let fixture: ComponentFixture<BalanceCheckSumsAndBalancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceCheckSumsAndBalancesComponent]
    });
    fixture = TestBed.createComponent(BalanceCheckSumsAndBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
