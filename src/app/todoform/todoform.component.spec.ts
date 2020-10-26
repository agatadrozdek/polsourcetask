import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {MatFormFieldControl, MatFormFieldModule, MatHint, MatLabel} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { TodoformComponent } from './todoform.component';

describe('TodoformComponent', () => {
  let component: TodoformComponent;
  let fixture: ComponentFixture<TodoformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoformComponent ],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatHint,
        MatLabel,
        MatFormFieldControl,
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
