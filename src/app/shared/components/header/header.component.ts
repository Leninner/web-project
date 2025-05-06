import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/services/auth.service";
import { StateService } from "../../../core/services/state.service";

@Component({
  selector: "bpaz-header",
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
  userEmail: string = "Usuario";

  private authService = inject(AuthService);
  private stateService = inject(StateService);
  private router = inject(Router);

  ngOnInit(): void {
    const user = this.authService.getDataUser();
    this.userEmail = user?.email ?? "Usuario";
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.stateService.setVisibility(false);
      this.router.navigate([""]);
    });
  }

  resetPassword() {
    const user = this.authService.getDataUser();
    if (user && user.email) {
      this.authService
        .resetPassword(user.email)
        .then(() =>
          alert(`Se envió un correo de recuperación a: ${user.email}`)
        )
        .catch((err) => {
          console.error(err);
          alert("Error al enviar correo de recuperación.");
        });
    } else {
      alert("No se encontró un usuario logueado.");
    }
  }
}
