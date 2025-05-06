import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface Favorite {
  _id?: string;
  name: string;
  description: string;
  category: string;
}

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  private API_URL = `${environment.API_URL}/favorites`;

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.API_URL);
  }

  getFavorite(id: string): Observable<Favorite> {
    return this.http.get<Favorite>(`${this.API_URL}/${id}`);
  }

  addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.post<Favorite>(this.API_URL, favorite);
  }

  deleteFavorite(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
