import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReleaseFormComponent } from './add-release-form.component';

describe('AddReleaseFormComponent', () => {
  let component: AddReleaseFormComponent;
  let fixture: ComponentFixture<AddReleaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReleaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReleaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
