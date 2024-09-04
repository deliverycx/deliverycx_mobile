import {QueryClient} from '@tanstack/react-query';
import {getCleanAddressApi} from '../api/cleanAddressApi';
import {CleanAddressRequestModel} from '../types/cleanAddressTypes';

const QUERY_KEY = 'DADATA_CLEAN_ADDRESS';

export const fetchCleanAddress = (
  queryClient: QueryClient,
  params: CleanAddressRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => getCleanAddressApi(params),
  });
};
