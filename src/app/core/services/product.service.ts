import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private productUrl = 'data/products.json';
  private productUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  editProductQuantity(
    productId: number,
    quantity: number
  ): Observable<Product> {
    return this.http.patch<Product>(`${this.productUrl}/${productId}`, {
      AvailablePieces: quantity,
    });
  }
}
