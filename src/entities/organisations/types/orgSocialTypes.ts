export interface OrgSocialRequestModel {
  idorganization: string;
}

export interface OrgSocialResponseModel {
  idorganization: string;
  like: string;
  social: Record<string, string>;
}
