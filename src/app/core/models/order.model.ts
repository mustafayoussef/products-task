export interface Order {
  id: number;
  OrderDate: string;
  UserId: string;
  Products: SingleProduct[];
  PaymentType: string;
}

export interface SingleProduct {
  ProductId: number;
  Quantity: number;
}
