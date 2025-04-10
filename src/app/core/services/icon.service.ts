import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface IIcon {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private listIcons: IIcon[] = [
    { name: 'logo', path: '../../../assets/icons/logo.svg' },
    { name: 'seller', path: '../../../assets/icons/seller.svg' },
    { name: 'client', path: '../../../assets/icons/client.svg' },
    { name: 'product', path: '../../../assets/icons/product.svg' },
    { name: 'favorite', path: '../../../assets/icons/favorite.svg' },
    { name: 'local_offer', path: '../../../assets/icons/local_offer.svg' },
    {
      name: 'account_balance_wallet',
      path: '../../../assets/icons/account_balance_wallet.svg',
    },
  ];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  private registerIcons(): void {
    this.listIcons.forEach((icon) => {
      this.iconRegistry.addSvgIcon(
        icon.name,
        this.sanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  }

  addIcon(name: string, path: string): void {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path)
    );
  }
}
