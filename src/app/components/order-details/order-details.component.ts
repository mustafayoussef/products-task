import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { Order } from '../../core/models/order.model';
import { Product } from '../../core/models/product.model';
import { User } from '../../core/models/user.model';
import { OrderService } from '../../core/services/order.service';
import { ProductService } from '../../core/services/product.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CardModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  order!: Order | any;
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
    this.order.Products.forEach((orderProduct: any) => {
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
