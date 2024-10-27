import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AddOrderComponent } from '../add-order/add-order.component';
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.updateMenuItems();
    });
    this.updateMenuItems();
  }

  updateMenuItems() {
    const currentUrl = this.router.url;
    this.items = [
      {
        label: 'Products',
        routerLink: '/products',
      },
      {
        label: 'Orders',
        routerLink: '/orders',
      },
      ...(currentUrl === '/orders'
        ? [
            {
              label: 'Add Order',
              routerLink: '/add-order',
            },
          ]
        : []),
      ...(currentUrl === '/add-order'
        ? [
            {
              label: 'Create',
              command: () => this.orderService.triggerAddOrder(),
            },
          ]
        : []),
    ];
  }
}
