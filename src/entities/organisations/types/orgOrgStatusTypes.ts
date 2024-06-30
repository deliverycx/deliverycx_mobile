export const enum DeliveryMethod {
  Courier = 'COURIER',
  PickUp = 'PICKUP',
  OnSpot = 'ONSPOT',
}

export const enum OrganisationStatus {
  Work = 'WORK',
  NoWork = 'NOWORK',
  OnWork = 'ONWORK',
  Open = 'OPEN',
  NoDelivery = 'NODELIVERY',
  SezonNotWork = 'SEZONNOTWORK',
}

export const enum PaymentMethod {
  Cash = 'CASH',
  ByCard = 'BYCARD',
  Card = 'CARD',
}

export interface OrgStatusRequestModel {
  organization: string;
}

export interface OrgStatusResponseModel {
  deliveryMetod: DeliveryMethod[];
  deliveryTime: number;
  organization: string;
  organizationStatus: OrganisationStatus;
  paymentMetod: PaymentMethod[];
}
