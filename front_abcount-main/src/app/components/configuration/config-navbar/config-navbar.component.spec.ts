import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigNavbarComponent } from './config-navbar.component';

describe('ConfigNavbarComponent', () => {
  let component: ConfigNavbarComponent;
  let fixture: ComponentFixture<ConfigNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigNavbarComponent]
    });
    fixture = TestBed.createComponent(ConfigNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
