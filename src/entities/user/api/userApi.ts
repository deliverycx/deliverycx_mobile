import {axiosInstance} from '../../../shared/api/axios';
import {UserResponseModel} from '../types/userTypes';

export const createUserApi = () => {
  return axiosInstance.post<UserResponseModel>('/user/create');
};
