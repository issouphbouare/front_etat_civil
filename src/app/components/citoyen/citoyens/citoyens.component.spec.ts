import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitoyensComponent } from './citoyens.component';

describe('CitoyensComponent', () => {
  let component: CitoyensComponent;
  let fixture: ComponentFixture<CitoyensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitoyensComponent]
    });
    fixture = TestBed.createComponent(CitoyensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
