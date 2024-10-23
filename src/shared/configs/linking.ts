import {URL_ID} from '../consts';
import {Routes} from '../routes';

export const linking = {
  prefixes: [`${URL_ID}://`],
  config: {
    screens: {
      [Routes.OrderStatus]: `${Routes.OrderStatus}/:hash`,
    },
  },
};
