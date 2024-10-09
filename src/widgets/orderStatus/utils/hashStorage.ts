import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const HASH_STORAGE_KEY = 'ORDER_HASH';

export const saveHashData = async (hash: string) => {
  try {
    await AsyncStorage.setItem(HASH_STORAGE_KEY, hash);
  } catch (e) {
    Toast.show({
      topOffset: 100,
      visibilityTime: 5000,
      type: 'error',
      text1: 'Ошибка сохранения hash в локальное хранилище',
    });
  }
};

export const removeHashData = async () => {
  try {
    await AsyncStorage.removeItem(HASH_STORAGE_KEY);
  } catch (e) {
    Toast.show({
      topOffset: 100,
      visibilityTime: 5000,
      type: 'error',
      text1: 'Ошибка удаления hash из локального хранилища',
    });
  }
};

export const getHashData = async () => {
  try {
    return await AsyncStorage.getItem(HASH_STORAGE_KEY);
  } catch (e) {
    Toast.show({
      topOffset: 100,
      visibilityTime: 5000,
      type: 'error',
      text1: 'Ошибка получения hash из локального хранилища',
    });
  }
};
