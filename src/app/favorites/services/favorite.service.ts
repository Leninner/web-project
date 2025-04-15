import { Injectable, signal } from '@angular/core';

export interface Favorite {
  id: number;
  name: string;
  description: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites = signal<Favorite[]>([
    { id: 1, name: 'Zapatillas Urbanas', description: 'Para uso diario', category: 'Calzado' },
    { id: 2, name: 'Mochila Outdoor', description: 'Ideal para excursiones', category: 'Accesorios' },
    { id: 3, name: 'Gorra Casual', description: 'Diseño moderno', category: 'Ropa' }
  ]);

  // Obtener la lista de favoritos
  getFavorites(): Favorite[] {
    return this.favorites();
  }

  // Eliminar un favorito por ID
  deleteFavorite(id: number): void {
    const updatedList = this.favorites().filter(fav => fav.id !== id);
    this.favorites.set(updatedList);
  }
}
