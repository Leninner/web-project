import { Injectable, signal } from "@angular/core";

export interface Transaction {
  id: number;
  type: string; // "Ingreso" o "Gasto"
  amount: number;
  date: Date;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private transactions = signal<Transaction[]>([
    {
      id: 1,
      type: "Ingreso",
      amount: 1200,
      date: new Date("2025-04-01"),
      description: "Venta de laptop a Juan Pérez",
    },
    {
      id: 2,
      type: "Gasto",
      amount: 50,
      date: new Date("2025-04-10"),
      description: "Compra de mouse inalámbrico",
    },
    {
      id: 3,
      type: "Ingreso",
      amount: 250,
      date: new Date("2025-04-12"),
      description: "Venta de monitor a Carlos Ruiz",
    },
  ]);

  getTransactions(): Transaction[] {
    return this.transactions();
  }

  addTransaction(transaction: Transaction) {
    this.transactions.set([
      ...this.transactions(),
      { ...transaction, id: this.generateId() },
    ]);
  }

  updateTransaction(updatedTransaction: Transaction) {
    const updated = this.transactions().map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    this.transactions.set(updated);
  }

  deleteTransaction(id: number) {
    const updated = this.transactions().filter((t) => t.id !== id);
    this.transactions.set(updated);
  }

  private generateId(): number {
    return this.transactions().length > 0
      ? Math.max(...this.transactions().map((t) => t.id)) + 1
      : 1;
  }
}
