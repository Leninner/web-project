import { Routes } from '@angular/router';
import { PageLoginComponent } from './core/components/page-login/page-login.component';
import { ListSellerComponent } from './sellers/components/list-seller/list-seller.component';
import { ListClientComponent } from './clients/components/list-client/list-client.component';
import { ListProductComponent } from './products/components/list-product/list-product.component';
import { ListFavoriteComponent } from './favorites/components/list-favorite/list-favorite.component';
import { ListOfferComponent } from './offers/components/list-offer/list-offer.component';
import { ListTransactionComponent } from './transactions/components/list-transaction/list-transaction.component';

export const routes: Routes = [
    {
        path: '',
        component: PageLoginComponent,
      },
      {
        path: 'sellers',
        component: ListSellerComponent,
      },
      {
        path: 'clients',
        component: ListClientComponent,
      },
      {
        path: 'products',
        component: ListProductComponent,
      },
      {
        path: 'favorites',
        component: ListFavoriteComponent,
      },
      {
        path: 'offers',
        component: ListOfferComponent,
      },
      {
        path: 'transactions',
        component: ListTransactionComponent,
      },
    
      
];
