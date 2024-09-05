import {axiosInstance} from '../../../shared/api/axios';
import {OrderCheckRequest, OrderCheckResponse} from '../types/orderCheckTypes';
import {OrderInfoRequest, OrderInfoResponse} from '../types/order';
import {
  CreateOrderMicroRequest,
  CreateOrderMicroResponse,
} from '../types/createOrderMicro';

export const checkOrderApi = (params: OrderCheckRequest) => {
  return axiosInstance.post<OrderCheckResponse>('/api/order/check', params);
};

export const getOrderApi = ({orderHash}: OrderInfoRequest) => {
  return axiosInstance.get<OrderInfoResponse>(
    `/api/order/getorder/${orderHash}`,
  );
};

export const createOrderMicroApi = (params: CreateOrderMicroRequest) => {
  return axiosInstance.post<CreateOrderMicroResponse>(
    '/api/order/createOrderMicro',
    params,
  );
};
