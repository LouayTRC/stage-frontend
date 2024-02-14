import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsAComponent } from './commands-a.component';

describe('CommandsAComponent', () => {
  let component: CommandsAComponent;
  let fixture: ComponentFixture<CommandsAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandsAComponent]
    });
    fixture = TestBed.createComponent(CommandsAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
