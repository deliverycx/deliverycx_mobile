import {useEffect, useState} from 'react';
import {useCartItemId} from './useCartItemId';

type CB = (cartId: string) => Promise<unknown>;

type Params = {
  orgId: string;
  userId: string;
  productId: string;
};

export const useCartCallbackQueue = ({orgId, userId, productId}: Params) => {
  const [cbs, setCbs] = useState<CB[]>([]);

  const cartId = useCartItemId({
    userId,
    orgId,
    productId,
  });

  useEffect(() => {
    if (cartId && cbs.length) {
      const cb = cbs.at(-1)!;

      setCbs([]);

      (async function () {
        await cb(cartId);
      })();
    }
  }, [cbs, cartId]);

  return {
    setCbs,
  };
};
