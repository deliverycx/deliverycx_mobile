import {
  DefaultError,
  QueryClient,
  useMutation,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import {checkOrderApi, getOrderApi} from '../api/orderApi';
import {GetOrderRequest, GetOrderResponse} from '../types/orderTypes';

const ORDER_CHECK_KEY = 'ORDER_CHECK_KEY';
const ORDER_GET_KEY = 'ORDER_GET_KEY';
const ORDER_CREATE_KEY = 'ORDER_CREATE_KEY';

export const useOrderCheckQuery = () => {
  return useMutation({
    mutationKey: [ORDER_CHECK_KEY],
    mutationFn: checkOrderApi,
  });
};

export const useGetOrderQuery = (
  data: GetOrderRequest,
  options?: Omit<
    UseQueryOptions<unknown, DefaultError, GetOrderResponse>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    ...options,
    queryKey: [ORDER_GET_KEY, data.hash],
    queryFn: () => getOrderApi(data),
  });
};

export const useCreateOrderQuery = () => {
  return useMutation({
    mutationKey: [ORDER_CREATE_KEY],
    mutationFn: checkOrderApi,
  });
};

export const fetchGetOrder = (
  queryClient: QueryClient,
  data: GetOrderRequest,
) => {
  return queryClient.fetchQuery({
    queryKey: [ORDER_GET_KEY, data.hash],
    queryFn: () => getOrderApi(data),
  });
};
