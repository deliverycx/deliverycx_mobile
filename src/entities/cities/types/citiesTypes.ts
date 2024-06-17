export interface City {
  countOrg: number;
  id: string;
  isHidden: boolean;
  name: string;
}

export interface CityRequestModel {}

export interface CityResponseModel extends Array<City> {}
