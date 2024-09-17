import {axiosInstance} from '../../../shared/api/axios';
import {CheckOrderResponse, CheckOrderRequest} from '../types/orderTypes';

export const checkOrderApi = (params: CheckOrderRequest) => {
  return axiosInstance.post<CheckOrderResponse>('/api/order/check', params);
};

// export const getOrderApi = ({orderHash}: OrderInfoRequest) => {
//   return axiosInstance.get<OrderInfoResponse>(
//     `/api/order/getorder/${orderHash}`,
//   );
// };
//
// export const createOrderApi = (params: CreateOrderMicroRequest) => {
//   return axiosInstance.post<CreateOrderMicroResponse>(
//     '/api/order/createOrderMicro',
//     params,
//   );
// };
