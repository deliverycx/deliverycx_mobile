import {useMutation} from '@tanstack/react-query';
import {checkGuestApi} from '../api/userApi';
import {CheckGuestRequestModel} from '../types/userTypes';

const checkGuest = async (params: CheckGuestRequestModel) => {
  const {data} = await checkGuestApi(params);

  return data;
};

export const useCheckGuest = () => {
  return useMutation({
    mutationFn: checkGuest,
  });
};
