import {axiosInstance} from '../../../shared/api/axios';
import {OrgKhinkaliCounterRequestModel} from '../types/orgKhinkaliCounterTypes';

export const getKhinkaliCounterApi = (
  params: OrgKhinkaliCounterRequestModel,
) => {
  return axiosInstance.post<string>('/webhook/flipcount', params);
};
