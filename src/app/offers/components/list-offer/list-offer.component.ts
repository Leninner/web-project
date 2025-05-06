import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { DatePipe, PercentPipe } from "@angular/common";

import { OfferService, Offer } from "../../services/offer.service";
import { OfferFormComponent } from "../offer-form/offer-form.component";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";

@Component({
  selector: "bpaz-list-offer",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    PercentPipe,
  ],
  templateUrl: "./list-offer.component.html",
  styleUrl: "./list-offer.component.css",
})
export class ListOfferComponent {
  offers = signal<Offer[]>([]);
  displayedColumns: string[] = [
    "name",
    "description",
    "discount",
    "startDate",
    "endDate",
    "actions",
  ];

  constructor(private offerService: OfferService, private dialog: MatDialog) {
    this.loadOffers();
  }

  loadOffers() {
    this.offerService.getOffers().subscribe((data) => this.offers.set(data));
  }

  openAddModal() {
    const dialogRef = this.dialog.open(OfferFormComponent, {
      data: null,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.offerService.addOffer(result).subscribe(() => this.loadOffers());
      }
    });
  }

  openEditModal(offer: Offer) {
    const dialogRef = this.dialog.open(OfferFormComponent, {
      data: offer,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && offer._id) {
        this.offerService
          .updateOffer(offer._id, result)
          .subscribe(() => this.loadOffers());
      }
    });
  }

  openConfirmModal(offer: Offer) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar la oferta "${offer.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed && offer._id) {
        this.offerService
          .deleteOffer(offer._id)
          .subscribe(() => this.loadOffers());
      }
    });
  }
}
