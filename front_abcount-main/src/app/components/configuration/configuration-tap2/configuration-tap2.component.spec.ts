import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationTap2Component } from './configuration-tap2.component';

describe('ConfigurationTap2Component', () => {
  let component: ConfigurationTap2Component;
  let fixture: ComponentFixture<ConfigurationTap2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationTap2Component]
    });
    fixture = TestBed.createComponent(ConfigurationTap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
