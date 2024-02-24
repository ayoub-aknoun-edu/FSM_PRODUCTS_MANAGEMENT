import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTagsHistoryComponent } from './display-tags-history.component';

describe('DisplayTagsHistoryComponent', () => {
  let component: DisplayTagsHistoryComponent;
  let fixture: ComponentFixture<DisplayTagsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTagsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTagsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
