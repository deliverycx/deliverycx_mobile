import {useMutation} from '@tanstack/react-query';
import {checkOrderApi} from '../api/orderApi';

const ORDER_CHECK_KEY = 'ORDER_CHECK_KEY';

export const useOrderCheckQuery = () => {
  return useMutation({
    mutationKey: [ORDER_CHECK_KEY],
    mutationFn: checkOrderApi,
  });
};
