import {useMemo} from 'react';
import {useProductsQuery} from '../queries/productsQueries';
import {useStopListQuery} from '../queries/stopListQueries';

export const useProducts = (orgId: string) => {
  const {data: products} = useProductsQuery({organization: orgId});
  const {data: stopList} = useStopListQuery({organizationId: orgId});

  const stopListMap = useMemo(() => {
    if (!stopList) {
      return null;
    }

    return Object.fromEntries(
      Object.entries(stopList).map(([_, value]) => [value.productId, true]),
    );
  }, [stopList]);

  const nextProducts = useMemo(() => {
    const productList = products?.products;

    if (!productList.length) {
      return null;
    }

    return productList.map(item => ({
      ...item,
      stopped: stopListMap?.[item.id] ?? false,
    }));
  }, [products, stopListMap]);

  return {
    products: nextProducts,
    categories: products.categoryes,
  };
};
