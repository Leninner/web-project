import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './core/components/menu/menu.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IconService } from './core/services/icon.service';

@Component({
  selector: 'bpaz-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MenuComponent,
    MatToolbarModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'appGestionVentas';
  constructor(private iconService: IconService) {}
}
