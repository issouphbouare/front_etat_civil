import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAvancementComponent } from './edit-avancement.component';

describe('EditAvancementComponent', () => {
  let component: EditAvancementComponent;
  let fixture: ComponentFixture<EditAvancementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAvancementComponent]
    });
    fixture = TestBed.createComponent(EditAvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
