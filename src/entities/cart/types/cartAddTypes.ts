import {Product} from '../../../shared/types/productTypes';
import {CartItem, CartTotal} from './cartTypes';

export interface CartAddRequestModel {
  anmount: number;
  organization: string;
  userid: string;
  product: Product;
}

export interface CartAddResponseModel extends CartTotal {
  item: CartItem;
}
