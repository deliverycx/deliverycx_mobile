export interface CartItem {
  amount: number;
  id: string;
  oneprice: number;
  price: number;
  productId: string;
  productImage: string;
  productName: string;
  productTags: string[];
}

export interface CartTotal {
  fullPrice: number;
  totalPrice: number;
  deltaPrice: number;
  deliveryPrice: number;
}
