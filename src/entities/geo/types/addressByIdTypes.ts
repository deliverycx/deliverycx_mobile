export interface AddressByIdData {
  street_kladr_id: string;
  geo_lat: string;
  geo_lon: string;
  street_with_type: string;
  house: string;
}

export interface AddressByIdSuggestion {
  value: string;
  unrestricted_value: string;
  data: AddressByIdData;
}

export interface AddressByIdRequestModel {
  query: string;
}

export interface AddressByIdResponseModel {
  suggestions: AddressByIdSuggestion[];
}
