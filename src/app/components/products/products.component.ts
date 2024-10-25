import { ProductService } from '../../core/services/product.service';
import { Component } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];
  editingProductId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProduct().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  updateProductQuantity(productId: number, newQuantity: number): void {
    this.productService.editProductQuantity(productId, newQuantity).subscribe({
      next: () => {
        (updatedProduct: Product) => {
          const index = this.products.findIndex(
            (p) => p.ProductId === updatedProduct.ProductId
          );
          if (index !== -1) {
            this.products[index].AvailablePieces = updatedProduct.AvailablePieces;
            this.editingProductId = null;
          }
        };
      },
      error: (error) => {
        console.error('Failed to update product quantity', error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  toggleEdit(productId: number): void {
    if (this.editingProductId === productId) {
      this.editingProductId = null;
    } else {
      this.editingProductId = productId;
    }
  }
}
