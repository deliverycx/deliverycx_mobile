import {ProductsResponseModel} from '../types/productsTypes';

export const useCategoryList = (data: ProductsResponseModel) => {
  return data.categoryes;
};
