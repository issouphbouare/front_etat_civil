import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebcamComponent } from './edit-webcam.component';

describe('EditWebcamComponent', () => {
  let component: EditWebcamComponent;
  let fixture: ComponentFixture<EditWebcamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWebcamComponent]
    });
    fixture = TestBed.createComponent(EditWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
