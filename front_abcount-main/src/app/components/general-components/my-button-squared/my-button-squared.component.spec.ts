import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyButtonSquaredComponent } from './my-button-squared.component';

describe('MyButtonSquaredComponent', () => {
  let component: MyButtonSquaredComponent;
  let fixture: ComponentFixture<MyButtonSquaredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyButtonSquaredComponent]
    });
    fixture = TestBed.createComponent(MyButtonSquaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
