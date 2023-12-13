import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPlanViewComponent } from './account-plan-view.component';

describe('AccountPlanViewComponent', () => {
  let component: AccountPlanViewComponent;
  let fixture: ComponentFixture<AccountPlanViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPlanViewComponent]
    });
    fixture = TestBed.createComponent(AccountPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
