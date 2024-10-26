export interface Order {
  id: number;
  OrderDate: string;
  UserId: string;
  Products: SingleProduct[];
  PaymentType: string;
  totalPrice: number;
}

export interface SingleProduct {
  ProductId: number;
  Quantity: number;
  ProductName: string;
  ProductImg: string;
}
