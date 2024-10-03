export interface Filter {
  _id: string;
  name: string;
  images: string;
}

export interface OrgCity {
  createdAt: string;
  isHidden: boolean;
  name: string;
  organizations: string[];
  updatedAt: string;
  _id: string;
}

export interface Organisation {
  address: string;
  city: string;
  cityid: OrgCity;
  cords: string[];
  id: string;
  isHidden: boolean;
  phone: string;
  workTime: string[];
  gallery: string[];
  guid: string;
  filters: Filter[];
  terminal: string;
}

export interface OrganisationsRequestModel {
  cityId: string;
}

export interface OrganisationsResponseModel extends Array<Organisation> {}

export interface OrganisationRequestModel {
  organizationId: string;
}

export interface OrganisationResponseModel extends Organisation {}
