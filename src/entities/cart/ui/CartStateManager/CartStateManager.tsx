import React, {FC, PropsWithChildren, useEffect} from 'react';
import {fetchCartItems} from '../../queries/cartAllItemsQueries';
import {useCartStore} from '../../stores/useCartStore';
import {useQueryClient} from '@tanstack/react-query';

type Props = PropsWithChildren<{
  orgId: string;
  userId: string;
}>;

export const CartStateManager: FC<Props> = ({children, userId, orgId}) => {
  const queryClient = useQueryClient();
  const updateItem = useCartStore(state => state.updateItem);

  useEffect(() => {
    (async function () {
      const data = await fetchCartItems(queryClient, {
        organization: orgId,
        userid: userId,
      });

      data.cart.forEach(item => {
        updateItem(item.productId, item.amount);
      });
    })();
  }, [userId, orgId, updateItem, queryClient]);

  return <>{children}</>;
};
