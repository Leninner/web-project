import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerService } from '../../services/seller.service';
import { SellerFormComponent } from '../seller-form/seller-form.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'; // Para manejar los modales

@Component({
  selector: 'app-list-seller',
  standalone: true, // ¡Este también es importante si estás usando standalone!
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './list-seller.component.html',
  styleUrls: ['./list-seller.component.css']
})
export class ListSellerComponent {
  sellers = signal<any[]>([]);

  constructor(private sellerService: SellerService, private dialog: MatDialog) {
    this.loadSellers();
  }

  loadSellers() {
    this.sellers.set(this.sellerService.getSellers());
  }

  openAddModal() {
    const dialogRef = this.dialog.open(SellerFormComponent, {
      data: null,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sellerService.addSeller(result);
        this.loadSellers();
      }
    });
  }

  openEditModal(seller: any) {
    const dialogRef = this.dialog.open(SellerFormComponent, {
      data: seller,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sellerService.updateSeller(result);
        this.loadSellers();
      }
    });
  }

  openConfirmModal(seller: any) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar a ${seller.name} ${seller.lastname}?`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.sellerService.deleteSeller(seller.dni);
        this.loadSellers();
      }
    });
  }
}
