import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public client: any
  ) {
    this.clientForm = this.fb.group({
      dni: [this.client?.dni || ''],
      name: [this.client?.name || ''],
      lastname: [this.client?.lastname || ''],
      email: [this.client?.email || ''],
      phone: [this.client?.phone || '']
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }
}
