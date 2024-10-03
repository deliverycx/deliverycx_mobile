import {QueryClient, useIsMutating, useMutation} from '@tanstack/react-query';
import {addApi} from '../api/cartApi';
import {CartAddRequestModel} from '../types/cartAddTypes';
import {
  CartAllItemResponseModel,
  CartAllItemsRequestModel,
} from '../types/cartAllItemsTypes';
import {QUERY_KEY as ALL_ITEMS_QUERY_KEY} from './cartAllItemsQueries';

const QUERY_KEY = 'CART_ADD_ITEM';

const addItem = async (params: CartAddRequestModel) => {
  const {data} = await addApi(params);

  return data;
};

export const useAddItem = (
  queryClient: QueryClient,
  params: CartAllItemsRequestModel,
) => {
  return useMutation({
    mutationFn: addItem,
    mutationKey: [QUERY_KEY],
    onSuccess: ({item, ...rest}) => {
      queryClient.setQueryData(
        [ALL_ITEMS_QUERY_KEY, params.userid, params.organization],
        (state: CartAllItemResponseModel) => {
          const nextCart = [...state.cart];
          const cartItemIndex = nextCart.findIndex(
            cartState => cartState.productId === item.productId,
          );

          if (cartItemIndex !== -1) {
            nextCart.splice(cartItemIndex, 1, item);
          } else {
            nextCart.push(item);
          }

          return {
            ...rest,
            cart: nextCart,
          };
        },
      );
    },
  });
};

export const useIsAddItemMutating = () => {
  return useIsMutating({
    mutationKey: [QUERY_KEY],
  });
};
