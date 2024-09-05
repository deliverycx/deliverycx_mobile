import {Order} from './orderCheckTypes';

export interface OrderInfoRequest {
  orderHash: string;
}

export interface OrderInfoResponse {
  createdAt: string;
  orderError: null;
  orderHash: string;
  orderId: string;
  orderParams: Order;
  orderStatus: string;
  organization: string;
  updatedAt: string;
  user: string;
}
