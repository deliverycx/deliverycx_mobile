import {
  DefaultError,
  QueryClient,
  useMutation,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import {
  checkCartApi,
  checkOrderApi,
  createOrderApi,
  createPaymentLinkApi,
  getOrderApi,
  getOrdersApi,
} from '../api/orderApi';
import {
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
} from '../types/orderTypes';

const ORDER_CHECK_KEY = 'ORDER_CHECK_KEY';
const ORDER_GET_KEY = 'ORDER_GET_KEY';
const ORDER_CREATE_KEY = 'ORDER_CREATE_KEY';
const ORDER_CHECK_CART_KEY = 'ORDER_CHECK_CART_KEY';
const ORDER_CREATE_PAYMENT_LINK_KEY = 'ORDER_CREATE_PAYMENT_LINK_KEY';
const ORDERS_GEY_KEY = 'ORDERS_GET_KEY';

export const useOrderCheckQuery = () => {
  return useMutation({
    mutationKey: [ORDER_CHECK_KEY],
    mutationFn: checkOrderApi,
  });
};

export const useOrderCheckCartQuery = () => {
  return useMutation({
    mutationKey: [ORDER_CHECK_CART_KEY],
    mutationFn: checkCartApi,
  });
};

export const useGetOrdersQuery = (
  payload: GetOrdersRequest,
  options?: Omit<
    UseQueryOptions<unknown, DefaultError, GetOrdersResponse>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    ...options,
    queryKey: [ORDERS_GEY_KEY, payload.userId],
    queryFn: async () => {
      const {data} = await getOrdersApi(payload);
      return data;
    },
  });
};

export const useGetOrderQuery = (
  payload: GetOrderRequest,
  options?: Omit<
    UseQueryOptions<unknown, DefaultError, GetOrderResponse>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    ...options,
    queryKey: [ORDER_GET_KEY, payload.hash],
    queryFn: async () => {
      const {data} = await getOrderApi(payload);
      return data;
    },
  });
};

export const useCreateOrderQuery = () => {
  return useMutation({
    mutationKey: [ORDER_CREATE_KEY],
    mutationFn: createOrderApi,
  });
};

export const fetchGetOrder = (
  queryClient: QueryClient,
  payload: GetOrderRequest,
) => {
  return queryClient.fetchQuery({
    queryKey: [ORDER_GET_KEY, payload.hash],
    queryFn: () => getOrderApi(payload),
  });
};

export const useCreatePaymentLinkQuery = () => {
  return useMutation({
    mutationKey: [ORDER_CREATE_PAYMENT_LINK_KEY],
    mutationFn: createPaymentLinkApi,
  });
};
