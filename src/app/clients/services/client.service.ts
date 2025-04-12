import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients = signal<any[]>([
    { id: 1, dni: 2001, name: 'Anahi', lastname: 'Martínez', email: 'anahi@example.com', phone: '111222333' },
    { id: 2, dni: 2002, name: 'Jorge', lastname: 'López', email: 'jorge@example.com', phone: '444555666' },
    { id: 3, dni: 2003, name: 'Angie', lastname: 'Caiza', email: 'angie@example.com', phone: '777888999' }
  ]);

  getClients(): any[] {
    return this.clients();
  }

  addClient(client: any) {
    this.clients.set([...this.clients(), client]);
  }

  updateClient(updatedClient: any) {
    const updatedList = this.clients().map(client =>
      client.dni === updatedClient.dni ? updatedClient : client
    );
    this.clients.set(updatedList);
  }

  deleteClient(dni: number) {
    const updatedList = this.clients().filter(client => client.dni !== dni);
    this.clients.set(updatedList);
  }
}
