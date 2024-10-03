import {axiosInstance} from '../../../shared/api/axios';
import {
  CheckOrderRequest,
  CheckOrderResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
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
