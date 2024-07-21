import {axiosInstanceAdmin} from '../../../shared/api/axios';
import {
  OrgSocialRequestModel,
  OrgSocialResponseModel,
} from '../types/orgSocialTypes';

export const getOrgSocialApi = (params: OrgSocialRequestModel) => {
  return axiosInstanceAdmin.get<OrgSocialResponseModel>(
    '/organization/socialbu',
    {
      params,
    },
  );
};
