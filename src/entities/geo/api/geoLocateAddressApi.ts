import axios from 'axios';
import {DADATA_API_KEY} from '../../../shared/consts';
import {
  GeoLocateAddressRequestModel,
  GeoLocateAddressResponseModel,
} from '../types/geoLocateAddressTypes';

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
