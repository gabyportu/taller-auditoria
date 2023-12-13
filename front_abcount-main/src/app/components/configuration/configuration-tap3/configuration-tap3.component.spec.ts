import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationTap3Component } from './configuration-tap3.component';

describe('ConfigurationTap3Component', () => {
  let component: ConfigurationTap3Component;
  let fixture: ComponentFixture<ConfigurationTap3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationTap3Component]
    });
    fixture = TestBed.createComponent(ConfigurationTap3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
