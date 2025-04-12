import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-seller-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './seller-form.component.html',
  styleUrls: ['./seller-form.component.css']
})
export class SellerFormComponent {
  sellerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SellerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public seller: any
  ) {
    this.sellerForm = this.fb.group({
      dni: [this.seller?.dni || ''],
      name: [this.seller?.name || ''],
      lastname: [this.seller?.lastname || ''],
      email: [this.seller?.email || ''],
      phone: [this.seller?.phone || '']
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.sellerForm.valid) {
      this.dialogRef.close(this.sellerForm.value);
    }
  }
}
