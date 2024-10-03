import {useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';
import {getCartItems, setCartItems} from '../queries/cartAllItemsQueries';
import {useDeleteAllItems} from '../queries/cartDeleteAllItemsQueries';
import {useCartStore} from '../stores/useCartStore';
import {CartAllItemsRequestModel} from '../types/cartAllItemsTypes';

export const useCartItemsRemove = ({
  organization,
  userid,
}: CartAllItemsRequestModel) => {
  const queryClient = useQueryClient();

  const clearAllItemsStore = useCartStore(state => state.clearAllItems);
  const {mutateAsync: deleteAllItems} = useDeleteAllItems(queryClient, {
    organization,
    userid,
  });

  return useCallback(async () => {
    const currentCartItems = getCartItems(queryClient, {organization, userid});

    setCartItems(
      queryClient,
      {organization, userid},
      {
        totalPrice: 0,
        cart: [],
        deliveryPrice: 0,
        deltaPrice: 0,
        fullPrice: 0,
      },
    );

    try {
      await deleteAllItems({userid});
      clearAllItemsStore();
    } catch (err) {
      setCartItems(queryClient, {organization, userid}, currentCartItems!);
    }
  }, [organization, userid, deleteAllItems, clearAllItemsStore, queryClient]);
};
