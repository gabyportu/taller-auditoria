import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeEditComponent } from './currency-exchange-edit.component';

describe('CurrencyExchangeEditComponent', () => {
  let component: CurrencyExchangeEditComponent;
  let fixture: ComponentFixture<CurrencyExchangeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyExchangeEditComponent]
    });
    fixture = TestBed.createComponent(CurrencyExchangeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
