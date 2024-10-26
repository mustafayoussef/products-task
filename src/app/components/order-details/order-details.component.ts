import { Component } from '@angular/core';
import { Order } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  order!: Order;
  user!: User;
  products: Product[] = [];

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrder(orderId).subscribe((data) => {
      this.order = data;
      this.loadUser(this.order.UserId);
      this.loadProducts();
    });
  }

  private loadUser(userId: string): void {
    this.userService.getUser(userId).subscribe((userData) => {
      this.user = userData;
    });
  }

  private loadProducts(): void {
    this.productService.getProduct().subscribe((productData) => {
      this.products = productData;
      this.mapProductDetails();
    });
  }

  private mapProductDetails(): void {
    this.order.Products.forEach((orderProduct) => {
      console.log('this.products', this.products);
      console.log('orderProduct', orderProduct.ProductId);

      const productDetails = this.products.find(
        (p) => p.id == orderProduct.ProductId
      );

      if (productDetails) {
        (orderProduct as any).ProductName = productDetails.ProductName;
        (orderProduct as any).ProductImg = productDetails.ProductImg;
      }
    });
  }
}
