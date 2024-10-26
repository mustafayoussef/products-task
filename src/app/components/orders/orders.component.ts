import { Component } from '@angular/core';
import { Order } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order.service';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: Order[] = [];
  products: Product[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadOrders(): void {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data.map((order) => ({
        ...order,
        totalPrice: this.calculateTotalPrice(order),
      }));
    });
  }

  private loadProducts(): void {
    this.productService.getProduct().subscribe((data: Product[]) => {
      this.products = data;
      this.loadOrders();
    });
  }

  private calculateTotalPrice(order: Order): number {
    return order.Products.reduce((total, orderProduct) => {
      const product = this.products.find((p) => p.id == orderProduct.ProductId);

      if (product) {
        return total + product.ProductPrice * orderProduct.Quantity;
      }
      return total;
    }, 0);
  }
}
