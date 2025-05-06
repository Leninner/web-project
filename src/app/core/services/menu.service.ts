import { Injectable } from "@angular/core";

export interface IMenu {
  title: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: "root",
})
export class MenuService {
  private listMenu: IMenu[] = [
    { title: "Vendedores", url: "/sellers", icon: "seller" },
    { title: "Clientes", url: "/clients", icon: "client" },
    { title: "Productos", url: "/products", icon: "product" },
    { title: "Favoritos", url: "/favorites", icon: "favorite" },
    { title: "Ofertas", url: "/offers", icon: "local_offer" },
    {
      title: "Transacciones",
      url: "/transactions",
      icon: "account_balance_wallet",
    },
  ];
  constructor() {}

  getMenu() {
    return [...this.listMenu];
  }

  getMenuByUrl(url: string): IMenu {
    return this.listMenu.find(
      (menu) => menu.url.toLowerCase() === url.toLocaleLowerCase()
    ) as IMenu;
  }
}
