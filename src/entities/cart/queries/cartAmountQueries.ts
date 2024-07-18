import {QueryClient, useMutation} from '@tanstack/react-query';
import {amountApi} from '../api/cartApi';
import {CartAmountRequestModel} from '../types/cartAmountTypes';
import {
  CartAllItemResponseModel,
  CartAllItemsRequestModel,
} from '../types/cartAllItemsTypes';
import {QUERY_KEY} from './cartAllItemsQueries';

const amountItem = async (
  params: CartAmountRequestModel,
  signal?: AbortSignal,
) => {
  const {data} = await amountApi(params, signal);

  return data;
};

export const useAmountItem = (
  queryClient: QueryClient,
  params: CartAllItemsRequestModel,
) => {
  return useMutation({
    mutationFn: ({
      signal,
      ...props
    }: CartAmountRequestModel & {signal?: AbortSignal}) => {
      return amountItem(props, signal);
    },
    onSuccess: ({item, ...rest}) => {
      queryClient.setQueryData(
        [QUERY_KEY, params.userid, params.organization],
        (state: CartAllItemResponseModel) => {
          const nextCart = [...state.cart];
          const cartItemIndex = nextCart.findIndex(
            cartState => cartState.productId === item.productId,
          );

          nextCart.splice(cartItemIndex, 1, item);

          return {
            ...rest,
            cart: nextCart,
          };
        },
      );
    },
  });
};
