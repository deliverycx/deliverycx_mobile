import {axiosInstance} from '../../../shared/api/axios';
import {
  ProductsResponseModel,
  ProductsRequestModel,
} from '../types/productsTypes';

export const getProductsApi = (params: ProductsRequestModel) => {
  return axiosInstance.get<ProductsResponseModel>('/product/nomenclature', {
    params,
  });
};
