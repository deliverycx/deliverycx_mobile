import {axiosInstance} from '../../../shared/api/axios';
import {
  CheckCartRequest,
  CheckCartResponse,
  CheckOrderRequest,
  CheckOrderResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  PaymentLinkRequest,
  PaymentLinkResponse,
} from '../types/orderTypes';

export const checkOrderApi = (params: CheckOrderRequest) => {
  return axiosInstance.post<CheckOrderResponse>('/order/check', params);
};

export const getOrderApi = ({hash}: GetOrderRequest) => {
  return axiosInstance.get<GetOrderResponse>(`/order/getorder/${hash}`);
};

export const createOrderApi = (params: CreateOrderRequest) => {
  return axiosInstance.post<CreateOrderResponse>(
    '/order/createOrderMicro',
    params,
  );
};

export const checkCartApi = (params: CheckCartRequest) => {
  return axiosInstance.post<CheckCartResponse>('/order/checkcart', params);
};

export const createPaymentLinkApi = (params: PaymentLinkRequest) => {
  return axiosInstance.post<PaymentLinkResponse>(
    '/webhook/paymentCreate',
    params,
  );
};
