import {useMemo} from 'react';
import {useCurrentOrgStore} from '../../../entities/organisations';
import {useProductsQuery} from '../../../entities/products';
import {useCartStore} from '../../../entities/cart';

export const useCartProducts = () => {
  const orgId = useCurrentOrgStore(state => state.orgId)!;

  const {data} = useProductsQuery({organization: orgId});
  const cartItems = useCartStore(state => state.getAllItems());

  const productMap = useMemo(() => {
    if (!data) {
      return {};
    }

    return Object.fromEntries(
      data.products.map(product => [product.id, product]),
    );
  }, [data]);

  return useMemo(() => {
    return cartItems.map(({productId, count}) => {
      return {
        ...productMap[productId],
        count,
      };
    });
  }, [productMap, cartItems]);
};
