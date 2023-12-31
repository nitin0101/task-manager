import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskDetailsComponent } from './view-task-details.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppModule } from '../../app.module';

describe('ViewTaskDetailsComponent', () => {
  let component: ViewTaskDetailsComponent;
  let fixture: ComponentFixture<ViewTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTaskDetailsComponent],
      imports: [MatDialogModule, AppModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
