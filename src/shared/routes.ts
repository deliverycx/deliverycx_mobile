export const enum Routes {
  Cities = 'Cities',
  Organisations = 'Organisations',
}

export type StackParamList = {
  [Routes.Cities]: undefined;
  [Routes.Organisations]: {
    cityId: string;
  };
};
