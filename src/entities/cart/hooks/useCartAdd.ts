import {useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';
import {Product} from '../../../shared/types/productTypes';
import {useAddItem} from '../queries/cartAddQueries';
import {useCartStore} from '../stores/useCartStore';

type Params = {
  orgId: string;
  userId: string;
  product: Product;
};

export const useCartAdd = ({orgId, userId, product}: Params) => {
  const queryClient = useQueryClient();
  const count = useCartStore(state => state.getCountById(product.productId));
  const updateItemStore = useCartStore(state => state.updateItem);

  const {mutateAsync: addItem} = useAddItem(queryClient, {
    organization: orgId,
    userid: userId,
  });

  const add = useCallback(
    async (nextCount: number) => {
      updateItemStore(product.productId, count + nextCount);

      try {
        await addItem({
          anmount: nextCount,
          organization: orgId,
          userid: userId,
          product,
        });
      } catch (err) {
        updateItemStore(product.productId, count);
      }
    },
    [orgId, userId, addItem, product, updateItemStore, count],
  );

  return {
    add,
  };
};
