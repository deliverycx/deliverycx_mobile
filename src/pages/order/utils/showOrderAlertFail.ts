import {Alert} from 'react-native';

export const showOrderAlertFail = () => {
  return Alert.alert('Ошибка', 'Ошибка оформления заказа, попробуйте позже');
};
