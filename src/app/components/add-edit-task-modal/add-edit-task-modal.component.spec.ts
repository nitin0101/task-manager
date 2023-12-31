import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTaskModalComponent } from './add-edit-task-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AppModule } from '../../app.module';

describe('AddEditTaskModalComponent', () => {
  let component: AddEditTaskModalComponent;
  let fixture: ComponentFixture<AddEditTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditTaskModalComponent],
      imports: [MatDialogModule, AppModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {close:()=>{}} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('cancel method should hide dialog',()=>{
    spyOn(component['dialogRef'],'close');
    component.cancel()
    expect(component.dialogRef.close).toHaveBeenCalled()
  })


  it('submit method should close dialog with task details',()=>{
    spyOn(component['dialogRef'],'close');
    component.submit()
    expect(component.dialogRef.close).toHaveBeenCalled()
  })
});
