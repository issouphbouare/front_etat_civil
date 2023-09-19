import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoordinationComponent } from './edit-coordination.component';

describe('EditCoordinationComponent', () => {
  let component: EditCoordinationComponent;
  let fixture: ComponentFixture<EditCoordinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCoordinationComponent]
    });
    fixture = TestBed.createComponent(EditCoordinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
