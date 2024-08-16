export const enum Kind {
  country = 'country',
  province = 'province',
  area = 'area',
  locality = 'locality',
  street = 'street',
  house = 'house',
}

export interface Component {
  kind: Kind;
  name: string;
}

export interface Address {
  Components: Component[];
}

export interface GeocoderMetaData {
  Address: Address;
}

export interface MetaDataProperty {
  GeocoderMetaData: GeocoderMetaData;
}

export interface GeoObject {
  metaDataProperty: MetaDataProperty;
  Point: Point;
}

export interface Point {
  pos: string;
}

export interface FeatureMember {
  GeoObject: GeoObject;
}

export interface GeoObjectCollection {
  featureMember: FeatureMember[];
}

export interface YandexRequestModel {
  geocode: string;
  kind?: string;
}

export interface Response {
  GeoObjectCollection: GeoObjectCollection;
}

export interface YandexResponseModel {
  response: Response;
}
