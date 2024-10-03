import {OrderType} from '../../../shared/types/order';

export const hasDelivery = (deliveryMethod: OrderType[]) => {
  return deliveryMethod.includes(OrderType.Courier);
};
