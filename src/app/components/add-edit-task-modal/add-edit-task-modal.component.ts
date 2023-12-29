import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-add-task-modal',
  templateUrl: './add-edit-task-modal.component.html',
  styleUrl: './add-edit-task-modal.component.css',
})
export class AddEditTaskModalComponent {
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    dueDate: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
  });

  header: string = 'Add Task';
  constructor(
    public dialogRef: MatDialogRef<AddEditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.taskForm.get('title')?.patchValue(data.title);
      this.taskForm.get('description')?.patchValue(data.description);
      this.taskForm.get('dueDate')?.patchValue(data.dueDate);
      this.taskForm.get('priority')?.patchValue(data.priority);
      this.header = data.title;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const date = this.taskForm.get('dueDate')?.value;
    const originalDate = new Date(date as any);
    const formattedDate = `${originalDate.getUTCFullYear()}-${(
      originalDate.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${originalDate
      .getUTCDate()
      .toString()
      .padStart(2, '0')}`;

    const task = {
      title: this.taskForm.get('title')?.value,
      description: this.taskForm.get('description')?.value,
      priority: this.taskForm.get('priority')?.value,
      dueDate: formattedDate,
    };

    this.dialogRef.close({ task: { ...this.data, ...task } });
  }
}
