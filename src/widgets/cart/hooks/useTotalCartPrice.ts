import {useMemo} from 'react';
import {useProductsQuery} from '../../../entities/products';
import {useCurrentOrgStore} from '../../../entities/organisations';
import {useCartStore} from '../../../entities/cart';
import {getFormatPrice} from '../../../shared/utils/getFormatPrice';

export const useTotalCartPrice = () => {
  const orgId = useCurrentOrgStore(state => state.orgId)!;

  const {data} = useProductsQuery({organization: orgId});
  const cartItems = useCartStore(state => state.getAllItems());

  const productsPriceMap = useMemo(() => {
    if (!data) {
      return {};
    }

    return Object.fromEntries(
      data.products.map(product => [product.id, product.price]),
    );
  }, [data]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, cur) => {
      return acc + productsPriceMap[cur.productId] * cur.count;
    }, 0);
  }, [cartItems, productsPriceMap]);

  const formattedTotalPrice = useMemo(
    () => getFormatPrice(totalPrice),
    [totalPrice],
  );

  return {
    totalPrice,
    formattedTotalPrice,
  };
};
