import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FC, useEffect} from 'react';
import {Routes, StackParamList} from '../../../../shared/routes';
import {getHashData} from '../../utils/hashStorage';

export const OrderStatusManager: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  useEffect(() => {
    const checkHash = async () => {
      const hash = await getHashData();

      if (!hash) {
        return;
      }

      navigation.navigate(Routes.OrderStatus, {
        hash,
      });
    };

    checkHash();
  }, [navigation]);

  return null;
};
