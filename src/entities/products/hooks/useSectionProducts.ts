import {useMemo} from 'react';
import {Product, ProductsResponseModel} from '../types/productsTypes';

export const useSectionProducts = (data: ProductsResponseModel) => {
  return useMemo(() => {
    const getMapOfCategories = data.products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);

    return Object.entries(getMapOfCategories).map(([category, products]) => ({
      title: data.categoryes.find(({id}) => id === category)?.name ?? category,
      id: category,
      data: products,
    }));
  }, [data]);
};
