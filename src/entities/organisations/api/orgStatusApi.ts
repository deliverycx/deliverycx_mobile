import {axiosInstance} from '../../../shared/api/axios';
import {
  OrgStatusRequestModel,
  OrgStatusResponseModel,
} from '../types/orgOrgStatusTypes';

export const getOrgStatusApi = (params: OrgStatusRequestModel) => {
  return axiosInstance.get<OrgStatusResponseModel>(
    '/organization/organizationstatus',
    {
      params,
    },
  );
};
