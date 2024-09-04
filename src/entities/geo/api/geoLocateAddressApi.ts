import axios from 'axios';
import {
  GeoLocateAddressResponseModel,
  GeoLocateAddressRequestModel,
} from '../types/geoLocateAddressTypes';
import {DADATA_API_KEY} from '../../../shared/consts';

const BASE_URL =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';

export const getGeoLocateAddressDataApi = (
  data: GeoLocateAddressRequestModel,
) => {
  return axios.post<GeoLocateAddressResponseModel>(BASE_URL, data, {
    headers: {
      Authorization: 'Token ' + DADATA_API_KEY,
    },
  });
};
