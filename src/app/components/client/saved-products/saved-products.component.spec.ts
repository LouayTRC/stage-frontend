import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedProductsComponent } from './saved-products.component';

describe('SavedProductsComponent', () => {
  let component: SavedProductsComponent;
  let fixture: ComponentFixture<SavedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedProductsComponent]
    });
    fixture = TestBed.createComponent(SavedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
