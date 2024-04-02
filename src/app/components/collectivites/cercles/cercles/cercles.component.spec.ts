import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerclesComponent } from './cercles.component';

describe('CerclesComponent', () => {
  let component: CerclesComponent;
  let fixture: ComponentFixture<CerclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CerclesComponent]
    });
    fixture = TestBed.createComponent(CerclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
