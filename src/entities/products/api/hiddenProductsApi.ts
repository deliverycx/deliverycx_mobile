import {axiosInstanceAdmin} from '../../../shared/api/axios';
import {
  HiddenProductsRequestModel,
  HiddenProductsResponseModel,
} from '../types/hiddenProductsTypes';

export const getHiddenProductsApi = (params: HiddenProductsRequestModel) => {
  return axiosInstanceAdmin.post<HiddenProductsResponseModel>(
    '/organizationProduct/hiddenProducts',
    params,
  );
};
