export interface CleanAddressSuggestion {
  street_kladr_id: string;
  geo_lat: string;
  geo_lon: string;
  street_with_type: string;
  house: string;
}

export interface CleanAddressRequestModel extends Array<string> {}

export interface CleanAddressResponseModel
  extends Array<CleanAddressSuggestion> {}
