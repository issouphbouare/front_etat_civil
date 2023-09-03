import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDBComponent } from './file-db.component';

describe('FileDBComponent', () => {
  let component: FileDBComponent;
  let fixture: ComponentFixture<FileDBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileDBComponent]
    });
    fixture = TestBed.createComponent(FileDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
