export interface GeoLocateAddressData {
  street_kladr_id: string | null;
  geo_lat: string | null;
  geo_lon: string | null;
  street_with_type: string | null;
  house: string | null;
}

export interface GeoLocateAddressSuggestion {
  value: string;
  unrestricted_value: string;
  data: GeoLocateAddressData;
}

export interface GeoLocateAddressRequestModel {
  lat: number;
  lon: number;
}

export interface GeoLocateAddressResponseModel {
  suggestions: GeoLocateAddressSuggestion[];
}
