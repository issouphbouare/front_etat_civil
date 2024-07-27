import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondamnationsComponent } from './condamnations.component';

describe('CondamnationsComponent', () => {
  let component: CondamnationsComponent;
  let fixture: ComponentFixture<CondamnationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CondamnationsComponent]
    });
    fixture = TestBed.createComponent(CondamnationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
