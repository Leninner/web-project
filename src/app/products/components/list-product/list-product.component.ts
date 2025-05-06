import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductService, Product } from "../../services/product.service";
import { ProductFormComponent } from "../product-form/product-form.component";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-list-product",
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.css"],
})
export class ListProductComponent {
  products = signal<Product[]>([]);

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.productService.addProduct(result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

  openEditModal(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: product,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result && result._id) {
        this.productService.updateProduct(result._id, result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

  openConfirmModal(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar el producto "${product.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && product._id) {
        this.productService.deleteProduct(product._id).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }
}
