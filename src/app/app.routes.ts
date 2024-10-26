import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
  {path:'products', component: ProductsComponent},
  {path:'orders', component: OrdersComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];
