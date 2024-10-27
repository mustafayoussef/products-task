import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/orders/orders.component').then(
        (m) => m.OrdersComponent
      ),
  },
  {
    path: 'order-details/:id',
    loadComponent: () =>
      import('./components/order-details/order-details.component').then(
        (m) => m.OrderDetailsComponent
      ),
  },
  {
    path: 'add-order',
    loadComponent: () =>
      import('./components/add-order/add-order.component').then(
        (m) => m.AddOrderComponent
      ),
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
