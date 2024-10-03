export interface City {
  countOrg: number;
  id: string;
  isHidden: boolean;
  name: string;
  isHiddenOnMobile: boolean;
}

export interface CityRequestModel {}

export interface CityResponseModel extends Array<City> {}
