import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { TransactionService } from "../../services/transaction.service";
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
  transactions = signal<any[]>([]);
  displayedColumns: string[] = [
    "id",
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
    this.transactions.set(this.transactionService.getTransactions());
  }

  openAddModal() {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      data: null,
      width: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transactionService.addTransaction(result);
        this.loadTransactions();
      }
    });
  }

  openEditModal(transaction: any) {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      data: transaction,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transactionService.updateTransaction(result);
        this.loadTransactions();
      }
    });
  }

  openConfirmModal(transaction: any) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: `¿Estás seguro de eliminar la transacción #${transaction.id}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.transactionService.deleteTransaction(transaction.id);
        this.loadTransactions();
      }
    });
  }
}
