export interface HiddenProductsRequestModel {
  organization: string;
}

export interface HiddenProductsResponseModel {
  organization: string;
  hiddenProduct: string[];
}
