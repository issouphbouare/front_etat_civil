import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAutreComponent } from './edit-autre.component';

describe('EditAutreComponent', () => {
  let component: EditAutreComponent;
  let fixture: ComponentFixture<EditAutreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAutreComponent]
    });
    fixture = TestBed.createComponent(EditAutreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
