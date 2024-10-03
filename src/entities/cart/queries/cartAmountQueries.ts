import {QueryClient, useIsMutating, useMutation} from '@tanstack/react-query';
import {amountApi} from '../api/cartApi';
import {
  CartAllItemResponseModel,
  CartAllItemsRequestModel,
} from '../types/cartAllItemsTypes';
import {CartAmountRequestModel} from '../types/cartAmountTypes';
import {QUERY_KEY as ALL_ITEMS_QUERY_KEY} from './cartAllItemsQueries';

const QUERY_KEY = 'CART_UPDATE_ITEM';

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
    mutationKey: [QUERY_KEY],
    mutationFn: ({
      signal,
      ...props
    }: CartAmountRequestModel & {signal?: AbortSignal}) => {
      return amountItem(props, signal);
    },
    onSuccess: ({item, ...rest}) => {
      queryClient.setQueryData(
        [ALL_ITEMS_QUERY_KEY, params.userid, params.organization],
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

export const useIsAmountItemMutating = () => {
  return useIsMutating({
    mutationKey: [QUERY_KEY],
  });
};
