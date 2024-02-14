import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAComponent } from './products-a.component';

describe('ProductsAComponent', () => {
  let component: ProductsAComponent;
  let fixture: ComponentFixture<ProductsAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsAComponent]
    });
    fixture = TestBed.createComponent(ProductsAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
