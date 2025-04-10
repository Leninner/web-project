import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'bpaz-page-login',
  imports: [MatIconModule, LoginComponent],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css',
})
export class PageLoginComponent {}
