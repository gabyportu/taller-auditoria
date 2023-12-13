import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndPermissionsComponent } from './users-and-permissions.component';

describe('UsersAndPermissionsComponent', () => {
  let component: UsersAndPermissionsComponent;
  let fixture: ComponentFixture<UsersAndPermissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAndPermissionsComponent]
    });
    fixture = TestBed.createComponent(UsersAndPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
