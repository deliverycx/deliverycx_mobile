import {COLORS} from './styles';

export const enum Routes {
  Cities = 'Cities',
  Organisations = 'Organisations',
  Menu = 'Menu',
  TabScreens = 'TabScreens',
  Cart = 'Cart',
  Profile = 'Profile',
  Contacts = 'Contacts',
  Order = 'Order',
  Address = 'Address',
  Payment = 'Payment',
  Streets = 'Streets',
}

export type Address = {
  street: string;
  house: string;
  floor: string;
  entrance: string;
  flat: string;
};

export interface OrderParams {
  address?: Address;
  paymentMethod?: any;
}

export interface AddressParams {
  classifierId?: string;
}

export type StackParamList = {
  [Routes.Cart]: undefined;
  [Routes.Menu]: undefined;
  [Routes.Cities]: undefined;
  [Routes.Order]: OrderParams | undefined;
  [Routes.Address]: AddressParams | undefined;
  [Routes.Payment]: undefined;
  [Routes.Streets]: undefined;
  [Routes.Organisations]: {
    cityId: string;
  };
};

export const STACK_NAVIGATOR_OPTIONS = {
  headerTitleStyle: {
    color: COLORS.textPrimary,
  },
  headerTintColor: COLORS.main,
  headerShadowVisible: false,
  headerBackTitle: '',
};
