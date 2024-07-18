import {useMutation} from '@tanstack/react-query';
import {createUserApi} from '../api/userApi';

const createUser = async () => {
  const {data} = await createUserApi();

  return data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
