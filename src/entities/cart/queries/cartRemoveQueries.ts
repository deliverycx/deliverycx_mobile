import {QueryClient, useIsMutating, useMutation} from '@tanstack/react-query';
import {removeApi} from '../api/cartApi';
import {
  CartAllItemResponseModel,
  CartAllItemsRequestModel,
} from '../types/cartAllItemsTypes.ts';
import {CartRemoveItemRequestModel} from '../types/cartRemoveItemTypes';
import {QUERY_KEY as ALL_ITEMS_QUERY_KEY} from './cartAllItemsQueries';

const QUERY_KEY = 'CART_REMOVE_ITEM';

const removeItem = async (params: CartRemoveItemRequestModel) => {
  const {data} = await removeApi(params);

  return data;
};

export const useRemoveItem = (
  queryClient: QueryClient,
  params: CartAllItemsRequestModel,
) => {
  return useMutation({
    mutationFn: removeItem,
    mutationKey: [QUERY_KEY],
    onSuccess: ({deletedId, ...rest}) => {
      queryClient.setQueryData(
        [ALL_ITEMS_QUERY_KEY, params.userid, params.organization],
        (state: CartAllItemResponseModel) => {
          const nextCart = state.cart.filter(
            cartState => cartState.id !== deletedId,
          );

          return {
            ...rest,
            cart: nextCart,
          };
        },
      );
    },
  });
};

export const useIsRemoveItemMutating = () => {
  return useIsMutating({
    mutationKey: [QUERY_KEY],
  });
};
