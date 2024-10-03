import {axiosInstance} from '../../../shared/api/axios';
import {StreetRequestModel, StreetResponseModel} from '../types/streetTypes';

export const getStreetApi = async (data: StreetRequestModel) => {
  return axiosInstance.post<StreetResponseModel>('/webhook/getstreet', data);
};
