import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProductsHistoryComponent } from './display-products-history.component';

describe('DisplayProductsHistoryComponent', () => {
  let component: DisplayProductsHistoryComponent;
  let fixture: ComponentFixture<DisplayProductsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProductsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayProductsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
