import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private sellers = signal<any[]>([
    { id: 1, dni: 1001, name: 'Juan', lastname: 'Pérez', email: 'juan.perez@example.com', phone: '123456789' },
    { id: 2, dni: 1002, name: 'María', lastname: 'Gómez', email: 'maria.gomez@example.com', phone: '987654321' },
    { id: 3, dni: 1003, name: 'Carlos', lastname: 'López', email: 'carlos.lopez@example.com', phone: '456123789' }
  ]);

  getSellers(): any[] {
    return this.sellers();
  }

  addSeller(seller: any) {
    this.sellers.set([...this.sellers(), seller]);
  }

  updateSeller(updatedSeller: any) {
    const updatedList = this.sellers().map(seller =>
      seller.dni === updatedSeller.dni ? updatedSeller : seller
    );
    this.sellers.set(updatedList);
  }

  deleteSeller(dni: number) {
    const updatedList = this.sellers().filter(seller => seller.dni !== dni);
    this.sellers.set(updatedList);
  }
}
