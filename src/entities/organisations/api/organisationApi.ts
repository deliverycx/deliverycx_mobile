import {axiosInstance} from '../../../shared/api/axios';
import {
  OrganisationRequestModel,
  OrganisationResponseModel,
} from '../types/organisationsTypes';

export const getOrganisationApi = (params: OrganisationRequestModel) => {
  return axiosInstance.get<OrganisationResponseModel>('/organization/buguid', {
    params,
  });
};
