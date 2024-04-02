import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfessionComponent } from './add-profession.component';

describe('AddProfessionComponent', () => {
  let component: AddProfessionComponent;
  let fixture: ComponentFixture<AddProfessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProfessionComponent]
    });
    fixture = TestBed.createComponent(AddProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
