export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: SingleProduct[];
  PaymentType: string;
  totalPrice: number;
}

export interface SingleProduct {
  ProductId: number;
  Quantity: number;
}
