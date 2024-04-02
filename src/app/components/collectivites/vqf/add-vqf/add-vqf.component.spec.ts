import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVqfComponent } from './add-vqf.component';

describe('AddVqfComponent', () => {
  let component: AddVqfComponent;
  let fixture: ComponentFixture<AddVqfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVqfComponent]
    });
    fixture = TestBed.createComponent(AddVqfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
