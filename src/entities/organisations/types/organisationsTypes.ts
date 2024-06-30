export interface Filter {
  _id: string;
  name: string;
  images: string;
}

export interface Organisation {
  address: string;
  city: string;
  cityid: string;
  cords: string[];
  id: string;
  isHidden: boolean;
  phone: string;
  workTime: string[];
  gallery: string[];
  guid: string;
  filters: Filter[];
}

export interface OrganisationsRequestModel {
  cityId: string;
}

export interface OrganisationsResponseModel extends Array<Organisation> {}
