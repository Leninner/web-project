import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientService, Client } from "../../services/client.service";
import { ClientFormComponent } from "../client-form/client-form.component";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-list-client",
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: "./list-client.component.html",
  styleUrls: ["./list-client.component.css"],
})
export class ListClientComponent {
  clients = signal<Client[]>([]); // ✅ Usamos el tipo correcto

  constructor(private clientService: ClientService, private dialog: MatDialog) {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe((data) => {
      this.clients.set(data); // ✅ Espera un array, no Observable
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: null,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result: Client) => {
      if (result) {
        this.clientService.addClient(result).subscribe(() => {
          this.loadClients();
        });
      }
    });
  }

  openEditModal(client: Client) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: client,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result: Client) => {
      if (result && result._id) {
        this.clientService.updateClient(result._id, result).subscribe(() => {
          this.loadClients();
        });
      }
    });
  }

  openConfirmModal(client: Client) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar al cliente ${client.firstname} ${client.lastname}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && client._id) {
        this.clientService.deleteClient(client._id).subscribe(() => {
          this.loadClients();
        });
      }
    });
  }
}
