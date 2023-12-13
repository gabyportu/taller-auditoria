import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersAndPermissionsComponent } from './add-users-and-permissions.component';

describe('AddUsersAndPermissionsComponent', () => {
  let component: AddUsersAndPermissionsComponent;
  let fixture: ComponentFixture<AddUsersAndPermissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUsersAndPermissionsComponent]
    });
    fixture = TestBed.createComponent(AddUsersAndPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
