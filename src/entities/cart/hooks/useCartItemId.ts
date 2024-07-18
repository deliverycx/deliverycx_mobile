import {useMemo} from 'react';
import {useCartItemsQuery} from '../queries/cartAllItemsQueries';

type Params = {
  orgId: string;
  userId: string;
  productId: string;
};

export const useCartItemId = ({orgId, userId, productId}: Params) => {
  const {data} = useCartItemsQuery({organization: orgId, userid: userId});

  return useMemo(() => {
    if (!data) {
      return;
    }

    const cartItem = data.cart.find(item => item.productId === productId);

    return cartItem?.id;
  }, [data, productId]);
};
