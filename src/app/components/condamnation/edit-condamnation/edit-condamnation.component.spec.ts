import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCondamnationComponent } from './edit-condamnation.component';

describe('EditCondamnationComponent', () => {
  let component: EditCondamnationComponent;
  let fixture: ComponentFixture<EditCondamnationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCondamnationComponent]
    });
    fixture = TestBed.createComponent(EditCondamnationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
