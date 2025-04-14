import { CommonModule, DatePipe, PercentPipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { OfferService } from "../../services/offer.service";
import { MatDialog } from "@angular/material/dialog";
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
  offers = signal<any[]>([]);
  displayedColumns: string[] = [
    "id",
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
    this.offers.set(this.offerService.getOffers());
  }

  openAddModal() {
    const dialogRef = this.dialog.open(OfferFormComponent, {
      data: null,
      width: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.offerService.addOffer(result);
        this.loadOffers();
      }
    });
  }

  openEditModal(offer: any) {
    const dialogRef = this.dialog.open(OfferFormComponent, {
      data: offer,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.offerService.updateOffer(result);
        this.loadOffers();
      }
    });
  }

  openConfirmModal(offer: any) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar la oferta "${offer.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.offerService.deleteOffer(offer.id);
        this.loadOffers();
      }
    });
  }
}
