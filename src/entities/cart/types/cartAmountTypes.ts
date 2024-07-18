import {CartItem, CartTotal} from './cartTypes';

export interface CartAmountRequestModel {
  amount: number;
  organization: string;
  userid: string;
  cartId: string;
}

export interface CartAmountResponseModel extends CartTotal {
  item: CartItem;
}
