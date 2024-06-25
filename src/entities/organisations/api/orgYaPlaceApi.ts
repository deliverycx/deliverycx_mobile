import {axiosInstanceAdmin} from '../../../shared/api/axios';
import {
  OrgYaPlaceRequestModel,
  OrgYaPlaceResponseModel,
} from '../types/orgYaPlaceTypes';

export const getYaPlaceApi = (params: OrgYaPlaceRequestModel) => {
  return axiosInstanceAdmin.get<OrgYaPlaceResponseModel>(
    '/organization_goodplace/buorg',
    {
      params,
    },
  );
};
