import {axiosInstance} from '../../../shared/api/axios';
import {
  CheckGuestRequestModel,
  CheckGuestResponseModel,
  UserResponseModel,
} from '../types/userTypes';

export const createUserApi = () => {
  return axiosInstance.post<UserResponseModel>('/user/create');
};

export const checkGuestApi = (params: CheckGuestRequestModel) => {
  return axiosInstance.post<CheckGuestResponseModel>(
    '/user/check_guest',
    params,
  );
};
