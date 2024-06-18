import {axiosInstance} from '../../../shared/api/axios';
import {
  OrganisationsResponseModel,
  OrganisationsRequestModel,
} from '../types/organisationsTypes';

export const getOrganisationsApi = (params: OrganisationsRequestModel) => {
  return axiosInstance.get<OrganisationsResponseModel>('/organization/all', {
    params,
  });
};
