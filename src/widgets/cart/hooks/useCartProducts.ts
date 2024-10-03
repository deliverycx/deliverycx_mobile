import {useMemo} from 'react';
import {useCartStore} from '../../../entities/cart';
import {useCurrentOrgStore} from '../../../entities/organisations';
import {useProductsQuery} from '../../../entities/products';

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
