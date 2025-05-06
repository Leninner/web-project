import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-product-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {
    this.productForm = this.fb.group({
      name: [this.product?.name || "", Validators.required],
      description: [this.product?.description || "", Validators.required],
      price: [
        this.product?.price || 0,
        [Validators.required, Validators.min(0)],
      ],
      stock: [
        this.product?.stock || 0,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.productForm.valid) {
      this.dialogRef.close({ ...this.product, ...this.productForm.value });
    }
  }
}
