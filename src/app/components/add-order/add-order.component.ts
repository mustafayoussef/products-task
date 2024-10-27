import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { Order, SingleProduct } from '../../core/models/order.model';
import { Product } from '../../core/models/product.model';
import { User } from '../../core/models/user.model';
import { OrderService } from '../../core/services/order.service';
import { ProductService } from '../../core/services/product.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    InputNumberModule,
  ],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss',
})
export class AddOrderComponent {
  users = signal<User[]>([]);
  products = signal<Product[]>([]);
  selectedUser = signal<User | null>(null);
  selectedProducts = signal<SingleProduct[]>([]);
  paymentType = signal<string>('cash');
  productQuantities = signal<{ [key: number]: number }>({});
  payments = signal(['cash', 'online']);


  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadProducts();
    this.orderService.addOrder$.subscribe(() => {
      this.addOrder();
    });
  }


  private loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users.set(data);
    });
  }

  private loadProducts(): void {
    this.productService.getProduct().subscribe((data: Product[]) => {
      this.products.set(data.filter((product) => product.AvailablePieces > 0));
    });
  }

  addOrder(): void {
    const newOrder: Order = {
      id: Number(Date.now().toString()),
      OrderDate: new Date().toISOString(),
      UserId: this.selectedUser()?.Id || '',
      Products: this.selectedProducts().map((product: any) => ({
        ProductId: product.id,
        Quantity: this.productQuantities()[product.id] || 1,
      })),
      PaymentType: this.paymentType(),
    };

    this.orderService.addOrder(newOrder).subscribe({
      next: () => {
        console.log('Order added successfully');
        this.updateProductQuantities(newOrder.Products);
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Failed to add order', err);
      },
    });
  }

  private updateProductQuantities(orderProducts: { ProductId: number; Quantity: number }[]): void {
    orderProducts.forEach((orderProduct) => {
      const selectedProduct = this.products().find((p) => p.id === orderProduct.ProductId);
      if (selectedProduct) {
        const newQuantity = selectedProduct.AvailablePieces - orderProduct.Quantity;
        this.productService.editProductQuantity(selectedProduct.id, newQuantity).subscribe({
          next: () => {
            console.log(`Updated product ${selectedProduct.id} quantity to ${newQuantity}`);
          },
          error: (error) => {
            console.error(`Failed to update product ${selectedProduct.id}`, error);
          },
        });
      }
    });
  }

  onQuantityChange(productId: number, quantity: number): void {
    const quantities = { ...this.productQuantities(), [productId]: quantity };
    this.productQuantities.set(quantities);
  }
}
