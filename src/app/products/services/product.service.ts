import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>([
    { id: 1, name: 'Zapatillas Urbanas', description: 'Zapatillas para uso diario', price: 59.99, stock: 10 },
    { id: 2, name: 'Botas de Montaña', description: 'Resistentes al agua', price: 89.99, stock: 5 },
    { id: 3, name: 'Sandalias Playeras', description: 'Cómodas y ligeras', price: 24.99, stock: 15 }
  ]);

  getProducts(): Product[] {
    return this.products();
  }

  addProduct(product: Product) {
    this.products.set([...this.products(), product]);
  }

  updateProduct(updatedProduct: Product) {
    const updatedList = this.products().map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.products.set(updatedList);
  }

  deleteProduct(id: number) {
    const updatedList = this.products().filter(product => product.id !== id);
    this.products.set(updatedList);
  }
}
