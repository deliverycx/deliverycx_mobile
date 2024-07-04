import {useMemo} from 'react';
import {getFormatPrice} from '../../../shared/utils/getFormatPrice';
import {useCartProducts} from './useCartProducts.ts';

export const useTotalCartPrice = () => {
  const cartProducts = useCartProducts();

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((acc, cur) => {
      return acc + cur.price * cur.count;
    }, 0);
  }, [cartProducts]);

  const formattedTotalPrice = useMemo(
    () => getFormatPrice(totalPrice),
    [totalPrice],
  );

  return {
    totalPrice,
    formattedTotalPrice,
  };
};
