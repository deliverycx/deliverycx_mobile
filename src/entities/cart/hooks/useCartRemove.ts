import {useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';
import {useRemoveItem} from '../queries/cartRemoveQueries';
import {useCartStore} from '../stores/useCartStore';
import {useCartCallbackQueue} from './useCartCallbackQueue';

type Params = {
  orgId: string;
  userId: string;
  productId: string;
};

export const useCartRemove = ({orgId, userId, productId}: Params) => {
  const queryClient = useQueryClient();
  const {mutateAsync: removeItem} = useRemoveItem(queryClient, {
    organization: orgId,
    userid: userId,
  });

  const {setCbs} = useCartCallbackQueue({orgId, userId, productId});

  const updateItemStore = useCartStore(state => state.updateItem);

  const remove = useCallback(() => {
    updateItemStore(productId, 0);

    const cb = async (cartId: string) => {
      const promise = await removeItem({
        deletedId: productId,
        organization: orgId,
        userid: userId,
        cartId: cartId,
      });

      updateItemStore(productId, 0);

      return promise;
    };

    setCbs(state => [...state, cb]);
  }, [setCbs, removeItem, orgId, userId, productId, updateItemStore]);

  return {
    remove,
  };
};
