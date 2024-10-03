import axios from 'axios';
import {DADATA_API_KEY} from '../../../shared/consts';
import {
  CleanAddressRequestModel,
  CleanAddressResponseModel,
} from '../types/cleanAddressTypes';

const BASE_URL = 'https://cleaner.dadata.ru/api/v1/clean/address';

export const getCleanAddressApi = (data: CleanAddressRequestModel) => {
  return axios.post<CleanAddressResponseModel>(BASE_URL, data, {
    headers: {
      Authorization: 'Token ' + DADATA_API_KEY,
      'X-Secret': '8f5f52c12ed021543b01b80f7d1b8dd24a6413ba',
    },
  });
};
