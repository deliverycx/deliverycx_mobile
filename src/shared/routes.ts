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
}

export type Address = {
  street: string;
  house: string;
  floor: string;
  entrance: string;
  flat: string;
};

export type StackParamList = {
  [Routes.Cart]: undefined;
  [Routes.Menu]: undefined;
  [Routes.Cities]: undefined;
  [Routes.Order]: Address | undefined;
  [Routes.Address]: undefined;
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
