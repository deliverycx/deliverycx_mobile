export interface Street {
  classifierId: string;
  externalRevision: string;
  id: string;
  isDeleted: boolean;
  name: string;
}

export interface StreetRequestModel {
  organizationId: string;
}

export interface StreetResponseModel extends Array<Street> {}
