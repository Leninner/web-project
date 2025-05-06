import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface Client {
  _id?: string;
  dni: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  creationDate?: string;
}

@Injectable({
  providedIn: "root",
})
export class ClientService {
  private API_URL = `${environment.API_URL}/clients`;

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.API_URL);
  }

  getClient(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.API_URL}/${id}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.API_URL, client);
  }

  updateClient(id: string, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.API_URL}/${id}`, client);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
