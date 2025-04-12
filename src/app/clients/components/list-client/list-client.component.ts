import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service'; // Servicio de clientes
import { ClientFormComponent } from '../client-form/client-form.component'; // Formulario de cliente
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {
  clients = signal<any[]>([]);

  constructor(private clientService: ClientService, private dialog: MatDialog) {
    this.loadClients();
  }

  loadClients() {
    this.clients.set(this.clientService.getClients());
  }

  openAddModal() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: null,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.addClient(result);
        this.loadClients();
      }
    });
  }

  openEditModal(client: any) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: client,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.updateClient(result);
        this.loadClients();
      }
    });
  }

  openConfirmModal(client: any) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar al cliente ${client.name} ${client.lastname}?`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.clientService.deleteClient(client.dni);
        this.loadClients();
      }
    });
  }
}
