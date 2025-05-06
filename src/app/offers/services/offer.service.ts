import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface Offer {
  _id?: string;
  name: string;
  description?: string;
  discount?: number;
  startDate?: Date;
  endDate?: Date;
}

@Injectable({
  providedIn: "root",
})
export class OfferService {
  private API_URL = `${environment.API_URL}/offers`;

  constructor(private http: HttpClient) {}

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.API_URL);
  }

  getOffer(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.API_URL}/${id}`);
  }

  addOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(this.API_URL, offer);
  }

  updateOffer(id: string, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.API_URL}/${id}`, offer);
  }

  deleteOffer(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
