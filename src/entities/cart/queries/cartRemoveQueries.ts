import {QueryClient, useMutation} from '@tanstack/react-query';
import {removeApi} from '../api/cartApi';
import {CartRemoveItemRequestModel} from '../types/cartRemoveItemTypes';
import {
  CartAllItemResponseModel,
  CartAllItemsRequestModel,
} from '../types/cartAllItemsTypes.ts';
import {QUERY_KEY} from './cartAllItemsQueries.ts';

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
    onSuccess: ({deletedId, ...rest}) => {
      queryClient.setQueryData(
        [QUERY_KEY, params.userid, params.organization],
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
