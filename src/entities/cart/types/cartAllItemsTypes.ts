import {CartItem, CartTotal} from './cartTypes';

export interface CartAllItemsRequestModel {
  organization: string;
  userid: string;
}

export interface CartAllItemResponseModel extends CartTotal {
  cart: CartItem[];
}
