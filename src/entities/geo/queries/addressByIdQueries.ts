import {QueryClient} from '@tanstack/react-query';
import {getAddressByIdApi} from '../api/addressByIdApi';
import {AddressByIdRequestModel} from '../types/addressByIdTypes';

const QUERY_KEY = 'DADATA_ADDRESS_BY_ID';

export const fetchAddressById = (
  queryClient: QueryClient,
  params: AddressByIdRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params.query],
    queryFn: () => getAddressByIdApi(params),
  });
};
