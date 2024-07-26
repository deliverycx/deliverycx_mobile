import {QueryClient, useQuery} from '@tanstack/react-query';
import {getHiddenProductsApi} from '../api/hiddenProductsApi';
import {HiddenProductsRequestModel} from '../types/hiddenProductsTypes';

const QUERY_KEY = 'HIDDEN_PRODUCTS';

const getHiddenProducts = async (params: HiddenProductsRequestModel) => {
  const {data} = await getHiddenProductsApi(params);

  return data;
};

export const fetchHiddenProducts = (
  queryClient: QueryClient,
  params: HiddenProductsRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params.organization],
    queryFn: () => getHiddenProducts(params),
  });
};

export const useHiddenProductsQuery = (params: HiddenProductsRequestModel) => {
  return useQuery({
    queryKey: [QUERY_KEY, params.organization],
    queryFn: () => getHiddenProducts(params),
  });
};
