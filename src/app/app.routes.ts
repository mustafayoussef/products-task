import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AddOrderComponent } from './components/add-order/add-order.component';

export const routes: Routes = [
  {path:'products', component: ProductsComponent},
  {path:'orders', component: OrdersComponent},
  { path: 'order-details/:id', component: OrderDetailsComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];
