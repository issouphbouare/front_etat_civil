import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvancementComponent } from './add-avancement.component';

describe('AddAvancementComponent', () => {
  let component: AddAvancementComponent;
  let fixture: ComponentFixture<AddAvancementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAvancementComponent]
    });
    fixture = TestBed.createComponent(AddAvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
