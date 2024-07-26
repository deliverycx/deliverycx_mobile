export interface StopListItem {
  balance: number;
  dateAdd: string;
  productId: string;
  sku: string;
}

export interface StopListRequestModel {
  organizationId: string;
}

export interface StopListResponseModel extends Array<StopListItem> {}
