import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { StateService } from "../../../core/services/state.service";

@Component({
  selector: "bpaz-login",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  group: FormGroup;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private stateService = inject(StateService);

  constructor() {
    this.group = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    if (this.group.valid) {
      const { email, password } = this.group.value;
      try {
        await this.authService.login(email, password);
        this.stateService.setVisibility(true); // Muestra header y menú
        this.router.navigate(["/clients"]);
      } catch (error) {
        console.error("Error de login:", error);
        alert("Credenciales inválidas o error de autenticación.");
      }
    } else {
      console.log("Formulario inválido");
    }
  }
}
