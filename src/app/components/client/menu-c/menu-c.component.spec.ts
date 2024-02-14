import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCComponent } from './menu-c.component';

describe('MenuCComponent', () => {
  let component: MenuCComponent;
  let fixture: ComponentFixture<MenuCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCComponent]
    });
    fixture = TestBed.createComponent(MenuCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
