import {axiosInstance} from '../../../shared/api/axios';
import {CityResponseModel} from '../types/citiesTypes';

export const getCitiesApi = () => {
  return axiosInstance.get<CityResponseModel>('/city/all');
};
