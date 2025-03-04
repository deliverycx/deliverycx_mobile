import axios from 'axios';
import {YANDEX_API_KEY} from '../../../shared/consts';
import {YandexRequestModel, YandexResponseModel} from '../types/yandexTypes';

export const getYandexApi = (data: YandexRequestModel) => {
  return axios.get<YandexResponseModel>('https://geocode-maps.yandex.ru/1.x', {
    params: {
      ...data,
      format: 'json',
      kind: 'house',
      apikey: YANDEX_API_KEY,
    },
  });
};
