import {CartTotal} from './cartTypes';

export interface CartRemoveItemRequestModel {
  deletedId: string;
  organization: string;
  userid: string;
  cartId: string;
}

export interface CartRemoveItemResponseModel extends CartTotal {
  deletedId: string;
}
