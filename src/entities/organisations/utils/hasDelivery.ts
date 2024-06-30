import {DeliveryMethod} from '../types/orgOrgStatusTypes';

export const hasDelivery = (deliveryMethod: DeliveryMethod[]) => {
  return deliveryMethod.includes(DeliveryMethod.Courier);
};
