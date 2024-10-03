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

export interface OrderModel {
  user: string;
  organization: string;
  orderNumber: number;
  orderHash: string;
  orderError: string;
}

export interface CheckOrderRequest extends OrderCreateModel {}

export type CheckOrderResponse = string;

export interface GetOrderRequest {
  hash: string;
}

export interface GetOrderResponse extends OrderModel {}

export interface CreateOrderRequest extends OrderCreateModel {}

export type CreateOrderResponse = boolean;
