import {StreetRequestModel, StreetResponseModel} from '../types/streetTypes';
import {axiosInstance} from '../../../shared/api/axios';

export const getStreetApi = async (data: StreetRequestModel) => {
  return axiosInstance.post<StreetResponseModel>('/webhook/getstreet', data);
};
