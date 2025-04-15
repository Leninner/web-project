import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {
    this.productForm = this.fb.group({
      id: [this.product?.id || ''],
      name: [this.product?.name || ''],
      description: [this.product?.description || ''],
      price: [this.product?.price || ''],
      stock: [this.product?.stock || '']
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
