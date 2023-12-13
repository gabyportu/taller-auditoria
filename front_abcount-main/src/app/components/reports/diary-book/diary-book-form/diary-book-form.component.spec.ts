import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryBookFormComponent } from './diary-book-form.component';

describe('DiaryBookFormComponent', () => {
  let component: DiaryBookFormComponent;
  let fixture: ComponentFixture<DiaryBookFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiaryBookFormComponent]
    });
    fixture = TestBed.createComponent(DiaryBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
