import {useCallback} from 'react';
import {Alert, Linking} from 'react-native';

export const useOpenUrl = () => {
  return useCallback(async (url: string) => {
    try {
      return Linking.openURL(url);
    } catch (err) {
      Alert.alert('Ошибка', 'Не удалось открыть ссылку, попробуйте позже.');
    }
  }, []);
};
