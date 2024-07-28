import {COLORS} from './styles.ts';

export const enum Routes {
  Cities = 'Cities',
  Organisations = 'Organisations',
  Menu = 'Menu',
  TabScreens = 'TabScreens',
  Cart = 'Cart',
  Profile = 'Profile',
  Contacts = 'Contacts',
  Order = 'Order',
}

export type StackParamList = {
  [Routes.Cart]: undefined;
  [Routes.Menu]: undefined;
  [Routes.Cities]: undefined;
  [Routes.Order]: undefined;
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
