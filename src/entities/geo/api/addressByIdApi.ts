import axios from 'axios';
import {DADATA_API_KEY} from '../../../shared/consts';
import {
  AddressByIdRequestModel,
  AddressByIdResponseModel,
} from '../types/addressByIdTypes';

const BASE_URL =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/address';

export const getAddressByIdApi = (data: AddressByIdRequestModel) => {
  return axios.post<AddressByIdResponseModel>(BASE_URL, data, {
    headers: {
      Authorization: 'Token ' + DADATA_API_KEY,
    },
  });
};
