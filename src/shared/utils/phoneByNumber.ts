import {Linking} from 'react-native';

export const phoneByNumber = (phoneNumber: string) => {
  return Linking.openURL(`tel:${phoneNumber}`);
};
