import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationTap4Component } from './configuration-tap4.component';

describe('ConfigurationTap4Component', () => {
  let component: ConfigurationTap4Component;
  let fixture: ComponentFixture<ConfigurationTap4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationTap4Component]
    });
    fixture = TestBed.createComponent(ConfigurationTap4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
