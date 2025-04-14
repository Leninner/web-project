import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select"; 

@Component({
  selector: "bpaz-transaction-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule, 
  ],
  templateUrl: "./transaction-form.component.html",
  styleUrl: "./transaction-form.component.css",
})
export class TransactionFormComponent {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public transaction: any
  ) {
    this.transactionForm = this.fb.group({
      id: [this.transaction?.id || null],
      type: [this.transaction?.type || "Ingreso", Validators.required], 
      amount: [
        this.transaction?.amount || 0,
        [Validators.required, Validators.min(0)],
      ], 
      date: [
        this.transaction?.date ? new Date(this.transaction.date) : "",
        Validators.required,
      ], 
      description: [this.transaction?.description || "", Validators.required], 
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.transactionForm.valid) {
      this.dialogRef.close(this.transactionForm.value);
    }
  }
}
