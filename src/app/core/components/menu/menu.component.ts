import { Component, inject } from '@angular/core';
import { IMenu, MenuService } from '../../services/menu.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bpaz-menu',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  listMenu: IMenu[] = inject(MenuService).getMenu();
}
