import {QueryClient, useMutation} from '@tanstack/react-query';
import {addApi} from '../api/cartApi';
import {QUERY_KEY} from './cartAllItemsQueries';
import {CartAddRequestModel} from '../types/cartAddTypes';
import {
  CartAllItemResponseModel,
  CartAllItemsRequestModel,
} from '../types/cartAllItemsTypes';

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
    onSuccess: ({item, ...rest}) => {
      queryClient.setQueryData(
        [QUERY_KEY, params.userid, params.organization],
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
