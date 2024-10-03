import {OrderType, PaymentMethod} from '../../../shared/types/order';

export const enum OrganisationStatus {
  Work = 'WORK', // org works
  NoWork = 'NOWORK', // org close
  OnWork = 'ONWORK', // org is closing
  Open = 'OPEN', // org is starting opening
  NoDelivery = 'NODELIVERY', // org doesn't have delivery
  SezonNotWork = 'SEZONNOTWORK', // org temporally isn't working
}

export interface OrgStatusRequestModel {
  organization: string;
}

export interface OrgStatusResponseModel {
  deliveryMetod: OrderType[];
  deliveryTime: number;
  organization: string;
  organizationStatus: OrganisationStatus;
  paymentMetod: PaymentMethod[];
}
