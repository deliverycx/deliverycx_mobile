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
  getOrderApi,
} from '../api/orderApi';
import {GetOrderRequest, GetOrderResponse} from '../types/orderTypes';

const ORDER_CHECK_KEY = 'ORDER_CHECK_KEY';
const ORDER_GET_KEY = 'ORDER_GET_KEY';
const ORDER_CREATE_KEY = 'ORDER_CREATE_KEY';
const ORDER_CHECK_CART_KEY = 'ORDER_CHECK_CART_KEY';

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
