import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsActualiteComponent } from './details-actualite.component';

describe('DetailsActualiteComponent', () => {
  let component: DetailsActualiteComponent;
  let fixture: ComponentFixture<DetailsActualiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsActualiteComponent]
    });
    fixture = TestBed.createComponent(DetailsActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
