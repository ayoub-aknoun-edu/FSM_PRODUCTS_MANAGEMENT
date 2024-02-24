import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySuperTagsComponent } from './display-super-tags.component';

describe('DisplaySuperTagsComponent', () => {
  let component: DisplaySuperTagsComponent;
  let fixture: ComponentFixture<DisplaySuperTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySuperTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySuperTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
