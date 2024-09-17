import {OrderInputButton} from '../OrderInputButton';
import React, {FC} from 'react';
import {useStreets} from '../../../../widgets/order';
import {OrderForm, useOrderFormContext} from '../../../../entities/order';
import {useOrgCity} from '../../../../entities/organisations';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';

export const OrderAddress: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const {watch} = useOrderFormContext<OrderForm>();

  const streets = useStreets();
  const orgCity = useOrgCity();

  const street = watch('street');
  const house = watch('house');

  const getAddressInfo = () => {
    if (!street || !house) {
      return 'Выберите адрес';
    }

    return `${orgCity}, ${street}, ${house}`;
  };

  return (
    <OrderInputButton
      disabled={!streets.length}
      onPress={() => navigation.push(Routes.Address)}
      text={getAddressInfo()}
    />
  );
};
