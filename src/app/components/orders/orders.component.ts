import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Order } from '../../core/models/order.model';
import { Product } from '../../core/models/product.model';
import { OrderService } from '../../core/services/order.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, TableModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  products = signal<Product[]>([]);
  orders = signal<Order[]>([]);

  totalPrice = computed(() =>
    this.orders().map((order) => ({
      ...order,
      totalPrice: this.calculateTotalPrice(order),
    }))
  );

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProduct().subscribe((data: Product[]) => {
      this.products.set(data);
      this.loadOrders();
    });
  }

  private loadOrders(): void {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders.set(data);
    });
  }

  private calculateTotalPrice(order: Order): number {
    return order.Products.reduce((total, orderProduct) => {
      const product = this.products().find(
        (p) => p.id == orderProduct.ProductId
      );
      return product
        ? total + product.ProductPrice * orderProduct.Quantity
        : total;
    }, 0);
  }

  navigateToAddOrder(): void {
    this.router.navigate(['/add-order']);
  }
}
