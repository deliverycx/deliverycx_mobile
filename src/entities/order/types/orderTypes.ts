import {exp} from '@gorhom/bottom-sheet/lib/typescript/utilities/easingExp';

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

export interface OrderModel {
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
  address: AddressModel;
}

export interface CheckOrderRequest extends OrderModel {}

export type CheckOrderResponse = string;

export interface GetOrderRequest {
  hash: string;
}

export interface GetOrderResponse extends OrderModel {}

export interface CreateOrderRequest extends OrderModel {}

export type CreateOrderResponse = boolean;
