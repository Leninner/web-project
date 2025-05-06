import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SellerService, Seller } from "../../services/seller.service";
import { SellerFormComponent } from "../seller-form/seller-form.component";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-list-seller",
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: "./list-seller.component.html",
  styleUrls: ["./list-seller.component.css"],
})
export class ListSellerComponent {
  sellers = signal<Seller[]>([]);

  constructor(private sellerService: SellerService, private dialog: MatDialog) {
    this.loadSellers();
  }

  loadSellers() {
    this.sellerService.getSellers().subscribe((data) => {
      this.sellers.set(data);
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(SellerFormComponent, {
      data: null,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result: Seller) => {
      if (result) {
        this.sellerService.addSeller(result).subscribe(() => {
          this.loadSellers();
        });
      }
    });
  }

  openEditModal(seller: Seller) {
    const dialogRef = this.dialog.open(SellerFormComponent, {
      data: seller,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result: Seller) => {
      if (result && result._id) {
        this.sellerService.updateSeller(result._id, result).subscribe(() => {
          this.loadSellers();
        });
      }
    });
  }

  openConfirmModal(seller: Seller) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar a ${seller.name} ${seller.lastname}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && seller._id) {
        this.sellerService.deleteSeller(seller._id).subscribe(() => {
          this.loadSellers();
        });
      }
    });
  }
}
