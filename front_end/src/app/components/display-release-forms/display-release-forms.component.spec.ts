import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayReleaseFormsComponent } from './display-release-forms.component';

describe('DisplayReleaseFormsComponent', () => {
  let component: DisplayReleaseFormsComponent;
  let fixture: ComponentFixture<DisplayReleaseFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayReleaseFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayReleaseFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
