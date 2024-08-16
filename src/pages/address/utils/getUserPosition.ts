import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

export const getUserPosition = (): Promise<GeolocationResponse> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    });
  });
};
