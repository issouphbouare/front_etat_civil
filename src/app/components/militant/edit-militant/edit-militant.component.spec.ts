import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMilitantComponent } from './edit-militant.component';

describe('EditMilitantComponent', () => {
  let component: EditMilitantComponent;
  let fixture: ComponentFixture<EditMilitantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMilitantComponent]
    });
    fixture = TestBed.createComponent(EditMilitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
