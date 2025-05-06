import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface Transaction {
  _id?: string;
  type: string;
  amount: number;
  date: Date;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private API_URL = `${environment.API_URL}/transactions`;

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL);
  }

  getTransaction(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.API_URL}/${id}`);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.API_URL, transaction);
  }

  updateTransaction(
    id: string,
    transaction: Transaction
  ): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.API_URL}/${id}`, transaction);
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
