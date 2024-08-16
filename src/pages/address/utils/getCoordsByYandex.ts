import {YandexResponseModel} from '../../../entities/geo';

export const getCoordsByYandex = (
  data: YandexResponseModel,
): string | undefined => {
  return data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
    ?.Point?.pos;
};
