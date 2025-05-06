import { Component, signal } from "@angular/core";
import { CommonModule, DatePipe, CurrencyPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";

import {
  TransactionService,
  Transaction,
} from "../../services/transaction.service";
import { TransactionFormComponent } from "../transaction-form/transaction-form.component";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";

@Component({
  selector: "bpaz-list-transaction",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: "./list-transaction.component.html",
  styleUrl: "./list-transaction.component.css",
})
export class ListTransactionComponent {
  transactions = signal<Transaction[]>([]);
  displayedColumns: string[] = [
    "type",
    "amount",
    "date",
    "description",
    "actions",
  ];

  constructor(
    private transactionService: TransactionService,
    private dialog: MatDialog
  ) {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService
      .getTransactions()
      .subscribe((data) => this.transactions.set(data));
  }

  openAddModal() {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      data: null,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result: Transaction) => {
      if (result) {
        this.transactionService
          .addTransaction(result)
          .subscribe(() => this.loadTransactions());
      }
    });
  }

  openEditModal(transaction: Transaction) {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      data: transaction,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result: Transaction) => {
      if (result && transaction._id) {
        this.transactionService
          .updateTransaction(transaction._id, result)
          .subscribe(() => this.loadTransactions());
      }
    });
  }

  openConfirmModal(transaction: Transaction) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar la transacción "${transaction.description}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && transaction._id) {
        this.transactionService
          .deleteTransaction(transaction._id)
          .subscribe(() => this.loadTransactions());
      }
    });
  }
}
