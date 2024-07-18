import {useCallback, useRef} from 'react';
import axios, {AxiosError} from 'axios';
import {useQueryClient} from '@tanstack/react-query';
import {useAmountItem} from '../queries/cartAmountQueries';
import {useCartCallbackQueue} from './useCartCallbackQueue';
import {useCartStore} from '../stores/useCartStore';

type Params = {
  orgId: string;
  userId: string;
  productId: string;
};

export const useCartUpdate = ({orgId, userId, productId}: Params) => {
  const queryClient = useQueryClient();
  const controllerRef = useRef<AbortController | null>(null);

  const {mutateAsync: amountItem} = useAmountItem(queryClient, {
    organization: orgId,
    userid: userId,
  });

  const {setCbs} = useCartCallbackQueue({orgId, userId, productId});

  const count = useCartStore(state => state.getCountById(productId));
  const updateItemStore = useCartStore(state => state.updateItem);

  const update = useCallback(
    (nextCount: number) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      updateItemStore(productId, nextCount);

      (function (currentCount: number) {
        setCbs(state => [
          ...state,
          async (cartId: string) => {
            const controller = new AbortController();
            const signal = controller.signal;
            controllerRef.current = controller;

            try {
              const {item} = await amountItem({
                organization: orgId,
                userid: userId,
                cartId: cartId,
                amount: nextCount,
                signal,
              });

              updateItemStore(productId, item.amount);
            } catch (err) {
              if (
                axios.isAxiosError(err) &&
                err.code === AxiosError.ERR_CANCELED
              ) {
                return;
              }

              updateItemStore(productId, currentCount);
            }
          },
        ]);
      })(count);
    },
    [setCbs, updateItemStore, productId, count, userId, amountItem, orgId],
  );

  return {
    update,
    count,
    controllerRef,
  };
};
