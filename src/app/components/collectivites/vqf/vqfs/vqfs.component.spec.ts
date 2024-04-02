import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VqfsComponent } from './vqfs.component';

describe('VqfsComponent', () => {
  let component: VqfsComponent;
  let fixture: ComponentFixture<VqfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VqfsComponent]
    });
    fixture = TestBed.createComponent(VqfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
