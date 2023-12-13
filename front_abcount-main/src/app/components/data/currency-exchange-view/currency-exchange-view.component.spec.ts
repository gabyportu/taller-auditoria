import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeViewComponent } from './currency-exchange-view.component';

describe('CurrencyExchangeViewComponent', () => {
  let component: CurrencyExchangeViewComponent;
  let fixture: ComponentFixture<CurrencyExchangeViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyExchangeViewComponent]
    });
    fixture = TestBed.createComponent(CurrencyExchangeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
