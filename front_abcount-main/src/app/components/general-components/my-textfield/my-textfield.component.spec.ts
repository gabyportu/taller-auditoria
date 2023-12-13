import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTextfieldComponent } from './my-textfield.component';

describe('MyTextfieldComponent', () => {
  let component: MyTextfieldComponent;
  let fixture: ComponentFixture<MyTextfieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTextfieldComponent]
    });
    fixture = TestBed.createComponent(MyTextfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
