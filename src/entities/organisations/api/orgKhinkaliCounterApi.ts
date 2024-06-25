import {axiosInstanceAdmin} from '../../../shared/api/axios';
import {
  OrgKhinkaliCounterResponseModel,
  OrgKhinkaliCounterRequestModel,
} from '../types/orgKhinkaliCounterTypes';

export const getKhinkaliCounterApi = (
  params: OrgKhinkaliCounterRequestModel,
) => {
  return axiosInstanceAdmin.get<OrgKhinkaliCounterResponseModel>(
    '/counterhinkal/buorg',
    {
      params,
    },
  );
};
