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
  OrderStatus = 'OrderStatus',
}

export type StackParamList = {
  [Routes.Cart]: undefined;
  [Routes.Menu]: undefined;
  [Routes.Cities]: undefined;
  [Routes.Order]: undefined;
  [Routes.Address]: undefined;
  [Routes.Payment]: undefined;
  [Routes.Streets]: undefined;
  [Routes.TabScreens]: undefined;
  [Routes.OrderStatus]: {
    hash: string;
  };
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
