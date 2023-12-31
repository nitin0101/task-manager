import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationModalComponent } from './delete-confirmation-modal.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppModule } from '../../app.module';

describe('DeleteConfirmationModalComponent', () => {
  let component: DeleteConfirmationModalComponent;
  let fixture: ComponentFixture<DeleteConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConfirmationModalComponent],
      imports: [MatDialogModule, AppModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {close:()=>{}} },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
