import {QueryClient, useQuery} from '@tanstack/react-query';
import {getProductsApi} from '../api/productsApi';
import {ProductsRequestModel} from '../types/productsTypes';

const QUERY_KEY = 'PRODUCTS';

const getProducts = async (params: ProductsRequestModel) => {
  const {data} = await getProductsApi(params);

  return data;
};

const INITIAL_DATA = {
  products: [],
  categoryes: [],
};

export const fetchProducts = (
  queryClient: QueryClient,
  params: ProductsRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => getProducts(params),
    initialData: INITIAL_DATA,
  });
};

export const useProductsQuery = (params: ProductsRequestModel) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => getProducts(params),
    initialData: INITIAL_DATA,
  });
};
