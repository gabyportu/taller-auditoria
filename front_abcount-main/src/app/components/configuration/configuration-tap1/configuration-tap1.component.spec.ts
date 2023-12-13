import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationTap1Component } from './configuration-tap1.component';

describe('ConfigurationTap1Component', () => {
  let component: ConfigurationTap1Component;
  let fixture: ComponentFixture<ConfigurationTap1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationTap1Component]
    });
    fixture = TestBed.createComponent(ConfigurationTap1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
