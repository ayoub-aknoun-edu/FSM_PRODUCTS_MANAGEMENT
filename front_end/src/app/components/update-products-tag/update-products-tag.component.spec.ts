import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductsTagComponent } from './update-products-tag.component';

describe('UpdateProductsTagComponent', () => {
  let component: UpdateProductsTagComponent;
  let fixture: ComponentFixture<UpdateProductsTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductsTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProductsTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
