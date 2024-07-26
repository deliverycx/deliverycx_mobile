import {axiosInstance} from '../../../shared/api/axios';
import {
  StopListRequestModel,
  StopListResponseModel,
} from '../types/stopListTypes';

export const getStopListApi = (params: StopListRequestModel) => {
  return axiosInstance.get<StopListResponseModel>('/stoplist/getStopList/', {
    params,
  });
};
