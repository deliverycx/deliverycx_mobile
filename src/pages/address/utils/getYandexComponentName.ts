import {Kind, YandexResponseModel} from '../../../entities/geo';

export const getYandexComponentName = (
  geo: YandexResponseModel,
  kind: Kind,
) => {
  const component =
    geo?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components?.find(
      item => item.kind === kind,
    );

  return component?.name;
};
