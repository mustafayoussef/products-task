import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, InputNumberModule, TableModule, TagModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products = signal<Product[]>([]);
  editingProductId = signal<number | null>(null);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProduct().subscribe((data: Product[]) => {
      this.products.set(
        data.map((product) => ({
          ...product,
          inventoryStatus: this.getInventoryStatus(product.AvailablePieces),
        }))
      );
    });
  }

  updateProductQuantity(productId: number, newQuantity: number): void {
    this.productService.editProductQuantity(productId, newQuantity).subscribe({
      next: (updatedProduct: Product) => {
        const index = this.products().findIndex(
          (p) => p.id === updatedProduct.id
        );
        if (index !== -1) {
          const updatedProducts = [...this.products()];
          updatedProducts[index].AvailablePieces =
            updatedProduct.AvailablePieces;
          this.products.set(updatedProducts);
          this.editingProductId.set(null);
        }
      },
      error: (error) => {
        console.error('Failed to update product quantity', error);
      },
      complete: () => {
        this.loadProducts();
      },
    });
  }

  toggleEdit(productId: number): void {
    this.editingProductId.set(
      this.editingProductId() === productId ? null : productId
    );
  }

  getSeverity(availablePieces: number): any {
    return availablePieces >= 5
      ? 'success'
      : availablePieces >= 1
      ? 'warning'
      : 'danger';
  }

  getInventoryStatus(availablePieces: number): string {
    return availablePieces >= 5
      ? 'INSTOCK'
      : availablePieces >= 1
      ? 'LOWSTOCK'
      : 'OUTOFSTOCK';
  }
}
