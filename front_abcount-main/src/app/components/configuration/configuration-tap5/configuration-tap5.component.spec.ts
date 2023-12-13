import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationTap5Component } from './configuration-tap5.component';

describe('ConfigurationTap5Component', () => {
  let component: ConfigurationTap5Component;
  let fixture: ComponentFixture<ConfigurationTap5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationTap5Component]
    });
    fixture = TestBed.createComponent(ConfigurationTap5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
