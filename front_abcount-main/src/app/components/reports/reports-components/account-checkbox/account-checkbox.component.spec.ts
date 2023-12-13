import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCheckboxComponent } from './account-checkbox.component';

describe('AccountCheckboxComponent', () => {
  let component: AccountCheckboxComponent;
  let fixture: ComponentFixture<AccountCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountCheckboxComponent]
    });
    fixture = TestBed.createComponent(AccountCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
