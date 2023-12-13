import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOfIncomeComponent } from './statement-of-income.component';

describe('StatementOfIncomeComponent', () => {
  let component: StatementOfIncomeComponent;
  let fixture: ComponentFixture<StatementOfIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatementOfIncomeComponent]
    });
    fixture = TestBed.createComponent(StatementOfIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
