import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  products = signal<Product[]>([]);

  constructor(private productService: ProductService, private dialog: MatDialog) {
    this.loadProducts();
  }

  loadProducts() {
    this.products.set(this.productService.getProducts());
  }

  openAddModal() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.addProduct(result);
        this.loadProducts();
      }
    });
  }

  openEditModal(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: product,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.updateProduct(result);
        this.loadProducts();
      }
    });
  }

  openConfirmModal(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar el producto "${product.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productService.deleteProduct(product.id);
        this.loadProducts();
      }
    });
  }
}
