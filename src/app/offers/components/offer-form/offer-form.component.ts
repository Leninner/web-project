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

@Component({
  selector: "bpaz-offer-form",
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
  ],
  templateUrl: "./offer-form.component.html",
  styleUrl: "./offer-form.component.css",
})
export class OfferFormComponent {
  offerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OfferFormComponent>,
    @Inject(MAT_DIALOG_DATA) public offer: any
  ) {
    this.offerForm = this.fb.group({
      id: [this.offer?.id || null],
      name: [this.offer?.name || "", Validators.required],
      description: [this.offer?.description || "", Validators.required],
      discount: [
        this.offer?.discount || 0,
        [Validators.required, Validators.min(0), Validators.max(1)],
      ],
      startDate: [
        this.offer?.startDate ? new Date(this.offer.startDate) : "",
        Validators.required,
      ],
      endDate: [
        this.offer?.endDate ? new Date(this.offer.endDate) : "",
        Validators.required,
      ],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.offerForm.valid) {
      this.dialogRef.close(this.offerForm.value);
    }
  }
}
