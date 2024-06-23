import {API_URL} from '../../../shared/consts';

export const getImageUri = (image: string) => {
  return `${API_URL}/ecomm?origin=${image}`;
};
