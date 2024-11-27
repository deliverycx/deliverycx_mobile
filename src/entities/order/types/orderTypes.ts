import {OrderType, PaymentMethod} from '../../../shared/types/order';

export interface Kladr {
  id: string;
  name: string;
  externalRevision: string;
  classifierId: string;
  isDeleted: boolean;
}

export interface AddressModel {
  city: string;
  street: string;
  home: string;
  flat: string;
  intercom: string;
  entrance: string;
  floor: string;
  kladrid: Kladr;
}

export interface OrderCreateModel {
  comment: string;
  date: string;
  devises: string;
  hash: string;
  localhost: string;
  money: number;
  name: string;
  orderAmount: number;
  orderTotalAmount: number;
  orderType: string;
  organization: string;
  organizationid: string;
  paymentMethod: string;
  phone: string;
  terminal: string;
  timedelivery: string;
  userid: string;
  address?: AddressModel;
}

export enum OrderStatus {
  Success = 'Success',
  Error = 'Error',
}

export interface OrderParams {
  paymentMethod: PaymentMethod;
  orderType: OrderType;
  orderTotalAmount: number;
  date: string,
}

export interface OrderItem {
  amount: number;
  id: string;
  oneprice: number;
  price: number;
  productId: string;
  productImage: string;
  productName: string;
  productTags: string[];
}

export interface OrderModel {
  user: string;
  organization: string;
  orderNumber: number;
  orderHash: string;
  orderError: string;
  createdAt: string;
  orderStatus: OrderStatus;
  orderParams: OrderParams;
  orderItems: OrderItem[];
  payment: unknown;
}

export interface CheckOrderRequest extends OrderCreateModel {}

export type CheckOrderResponse = string;

export interface GetOrderRequest {
  hash: string;
}

export interface GetOrderResponse extends OrderModel {}

export interface CreateOrderRequest extends OrderCreateModel {}

export type CreateOrderResponse = boolean;

export interface CheckCartRequest {
  userid: string;
}

export type CheckCartResponse = string;

export interface PaymentLinkRequest extends OrderModel {}

export interface PaymentLinkResponse {
  redirectUrl: string;
}

export type GetOrdersRequest = {
  userId: string;
};

export type GetOrdersResponse = OrderModel[];
