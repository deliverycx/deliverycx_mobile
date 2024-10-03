import {useMemo} from 'react';
import {useHiddenProductsQuery} from '../queries/hiddenProductsQueries';
import {useProductsQuery} from '../queries/productsQueries';
import {useStopListQuery} from '../queries/stopListQueries';

export const useProducts = (orgId: string) => {
  const {data: products, isFetched: isProductsFetched} = useProductsQuery({
    organization: orgId,
  });
  const {data: stopList, isFetched: isStopListFetched} = useStopListQuery({
    organizationId: orgId,
  });
  const {data: hiddenProducts, isFetched: isHiddenProductsFetched} =
    useHiddenProductsQuery({organization: orgId});

  const isFetched =
    isProductsFetched && isStopListFetched && isHiddenProductsFetched;

  const stopListMap = useMemo(() => {
    if (!stopList) {
      return null;
    }

    return Object.fromEntries(
      Object.entries(stopList).map(([_, value]) => [value.productId, true]),
    );
  }, [stopList]);

  const hiddenMap = useMemo(() => {
    if (!hiddenProducts) {
      return null;
    }

    return Object.fromEntries(
      Object.entries(hiddenProducts.hiddenProduct).map(([_, productId]) => [
        productId,
        true,
      ]),
    );
  }, [hiddenProducts]);

  const nextProducts = useMemo(() => {
    const productList = products?.products;

    if (!productList.length) {
      return null;
    }

    return productList
      .filter(item => !hiddenMap?.[item.productId]) // Remove item from list
      .map(item => ({
        ...item,
        stopped: stopListMap?.[item.id] ?? false, // Add stop flag
      }));
  }, [products, stopListMap, hiddenMap]);

  return {
    products: nextProducts,
    categories: products.categoryes,
    isFetched,
  };
};
