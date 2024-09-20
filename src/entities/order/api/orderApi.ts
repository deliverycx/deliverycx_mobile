import {axiosInstance} from '../../../shared/api/axios';
import {
  CheckOrderResponse,
  CheckOrderRequest,
  GetOrderRequest,
  GetOrderResponse,
  CreateOrderResponse,
  CreateOrderRequest,
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
