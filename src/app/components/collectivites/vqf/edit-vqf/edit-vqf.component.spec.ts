import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVqfComponent } from './edit-vqf.component';

describe('EditVqfComponent', () => {
  let component: EditVqfComponent;
  let fixture: ComponentFixture<EditVqfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVqfComponent]
    });
    fixture = TestBed.createComponent(EditVqfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
