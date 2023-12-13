import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliaryAccountComponent } from './auxiliary-account.component';

describe('AuxiliaryAccountComponent', () => {
  let component: AuxiliaryAccountComponent;
  let fixture: ComponentFixture<AuxiliaryAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuxiliaryAccountComponent]
    });
    fixture = TestBed.createComponent(AuxiliaryAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
