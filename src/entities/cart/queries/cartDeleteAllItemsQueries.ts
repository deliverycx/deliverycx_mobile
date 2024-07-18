import {QueryClient, useMutation} from '@tanstack/react-query';
import {deleteAllItemsApi} from '../api/cartApi';
import {CartDeleteAllItemsRequestModel} from '../types/cartDeleteAllTypes';
import {fetchCartItems} from './cartAllItemsQueries';
import {CartAllItemsRequestModel} from '../types/cartAllItemsTypes';

const deleteAllItemsItem = async (params: CartDeleteAllItemsRequestModel) => {
  const {data} = await deleteAllItemsApi(params);

  return data;
};

export const useDeleteAllItems = (
  queryClient: QueryClient,
  params: CartAllItemsRequestModel,
) => {
  return useMutation({
    mutationFn: deleteAllItemsItem,
    onSuccess: async () => {
      await fetchCartItems(queryClient, params);
    },
  });
};
