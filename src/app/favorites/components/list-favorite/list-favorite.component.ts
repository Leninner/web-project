import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService, Favorite } from '../../services/favorite.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-favorite',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './list-favorite.component.html',
  styleUrls: ['./list-favorite.component.css']
})
export class ListFavoriteComponent {
  favorites = signal<Favorite[]>([]);

  constructor(private favoriteService: FavoriteService, private dialog: MatDialog) {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites.set(this.favoriteService.getFavorites());
  }

  openConfirmModal(favorite: Favorite) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar el favorito "${favorite.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.favoriteService.deleteFavorite(favorite.id);
        this.loadFavorites();
      }
    });
  }
}
