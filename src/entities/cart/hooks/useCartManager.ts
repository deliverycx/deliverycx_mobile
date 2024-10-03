import {useCallback} from 'react';
import {Product} from '../../../shared/types/productTypes';
import {useCartStore} from '../stores/useCartStore';
import {useCartAdd} from './useCartAdd';
import {useCartRemove} from './useCartRemove';
import {useCartUpdate} from './useCartUpdate';

type Params = {
  orgId: string;
  userId: string;
  product: Product;
};

export const useCartManager = ({orgId, userId, product}: Params) => {
  const {productId} = product;

  const count = useCartStore(state => state.getCountById(product.productId));

  const {add} = useCartAdd({orgId, userId, product});
  const {update, controllerRef: updateControllerRef} = useCartUpdate({
    orgId,
    userId,
    productId,
  });
  const {remove} = useCartRemove({
    orgId,
    userId,
    productId,
  });

  const manage = useCallback(
    async (nextCount: number) => {
      if (nextCount === 1 && count === 0) {
        await add(nextCount);
      } else if (nextCount === 0) {
        if (updateControllerRef.current) {
          updateControllerRef.current.abort();
        }
        remove();
      } else {
        update(nextCount);
      }
    },
    [count, add, remove, update, updateControllerRef],
  );

  return {
    count,
    manage,
  };
};
