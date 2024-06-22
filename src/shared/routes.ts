export const enum Routes {
  Cities = 'Cities',
  Organisations = 'Organisations',
  Menu = 'Menu',
  Cart = 'Cart',
  Profile = 'Profile',
  Contacts = 'Contacts',
}

export type StackParamList = {
  [Routes.Cart]: undefined;
  [Routes.Menu]: undefined;
  [Routes.Cities]: undefined;
  [Routes.Organisations]: {
    cityId: string;
  };
};
