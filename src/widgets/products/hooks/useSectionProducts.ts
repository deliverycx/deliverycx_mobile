import {useMemo} from 'react';
import {FullProduct} from '../../../shared/types/productTypes';
import {Category} from '../../../entities/products';

export const useSectionProducts = (
  products: FullProduct[] | null,
  categories: Category[] | null,
) => {
  return useMemo(() => {
    if (products === null || categories === null) {
      return [];
    }

    const getMapOfCategories = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, FullProduct[]>);

    return Object.entries(getMapOfCategories).map(
      ([category, productList]) => ({
        title: categories.find(({id}) => id === category)?.name ?? category,
        id: category,
        data: productList,
      }),
    );
  }, [products, categories]);
};
