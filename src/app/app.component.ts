import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MenuComponent } from "./core/components/menu/menu.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { IconService } from "./core/services/icon.service";
import { StateService } from "./core/services/state.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "bpaz-root",
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MenuComponent,
    MatToolbarModule,
    HeaderComponent,
    CommonModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "appGestionVentas";
  isLogged = false;

  private iconService = inject(IconService);
  private stateService = inject(StateService);

  ngOnInit(): void {
    this.stateService.isVisible$.subscribe((logged) => {
      this.isLogged = logged;
    });
  }
}
