import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface Seller {
  _id?: string;
  dni: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  creationDate?: string;
}

@Injectable({
  providedIn: "root",
})
export class SellerService {
  private API_URL = `${environment.API_URL}/sellers`;

  constructor(private http: HttpClient) {}

  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.API_URL);
  }

  getSeller(id: string): Observable<Seller> {
    return this.http.get<Seller>(`${this.API_URL}/${id}`);
  }

  addSeller(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(this.API_URL, seller);
  }

  updateSeller(id: string, seller: Seller): Observable<Seller> {
    return this.http.put<Seller>(`${this.API_URL}/${id}`, seller);
  }

  deleteSeller(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
