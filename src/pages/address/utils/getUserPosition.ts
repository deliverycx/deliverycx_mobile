import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {Platform} from 'react-native';

export const getUserPosition = (): Promise<GeolocationResponse> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: Platform.select({ios: true, android: false}),
      timeout: 20000,
      maximumAge: 1000,
    });
  });
};
