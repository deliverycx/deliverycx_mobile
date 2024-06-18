export interface Organisation {
  address: string;
  city: string;
  cords: string[];
  id: string;
  isHidden: boolean;
  phone: string;
  workTime: string[];
  gallery: string[];
  guid: string;
}

export interface OrganisationsRequestModel {
  cityId: string;
}

export interface OrganisationsResponseModel extends Array<Organisation> {}
