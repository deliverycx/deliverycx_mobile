import {QueryClient, useQuery} from '@tanstack/react-query';
import {getAllItemsApi} from '../api/cartApi';
import {
  CartAllItemResponseModel,
  CartAllItemsRequestModel,
} from '../types/cartAllItemsTypes';

export const QUERY_KEY = 'CART_ITEMS';

const getAllItems = async (params: CartAllItemsRequestModel) => {
  const {data} = await getAllItemsApi(params);

  return data;
};

export const fetchCartItems = (
  queryClient: QueryClient,
  params: CartAllItemsRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params.userid, params.organization],
    queryFn: () => getAllItems(params),
  });
};

export const useCartItemsQuery = (params: CartAllItemsRequestModel) => {
  return useQuery({
    queryKey: [QUERY_KEY, params.userid, params.organization],
    queryFn: () => getAllItems(params),
  });
};

export const getCartItems = (
  queryClient: QueryClient,
  params: CartAllItemsRequestModel,
) => {
  return queryClient.getQueryData<CartAllItemResponseModel>([
    QUERY_KEY,
    params.userid,
    params.organization,
  ]);
};

export const setCartItems = (
  queryClient: QueryClient,
  params: CartAllItemsRequestModel,
  value: CartAllItemResponseModel,
) => {
  return queryClient.setQueryData(
    [QUERY_KEY, params.userid, params.organization],
    value,
  );
};

export const resetCartItems = (
  queryClient: QueryClient,
  params: CartAllItemsRequestModel,
) => {
  return queryClient.resetQueries({
    queryKey: [QUERY_KEY, params.userid, params.organization],
  });
};
