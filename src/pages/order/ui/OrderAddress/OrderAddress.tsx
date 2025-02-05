import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useEffect} from 'react';
import {OrderForm, useOrderFormContext} from '../../../../entities/order';
import {useOrgCity} from '../../../../entities/organisations';
import {useMetrics} from '../../../../shared/hooks/useMetrics';
import {Routes, StackParamList} from '../../../../shared/routes';
import {useStreets} from '../../../../widgets/order';
import {OrderInputButton} from '../OrderInputButton';

export const OrderAddress: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const metrics = useMetrics();

  const {watch, register, unregister} = useOrderFormContext<OrderForm>();

  const streets = useStreets();
  const orgCity = useOrgCity();

  const street = watch('street');
  const house = watch('house');
  const flat = watch('flat');

  useEffect(() => {
    register('classifierId', {
      required: 'Выберите адрес доставки',
    });

    return () => {
      unregister('classifierId');
    };
  }, [register, unregister]);

  const getAddressInfo = () => {
    if (!street || !house) {
      return 'Выберите адрес';
    }

    return `${orgCity},\n${street}, ${house}` + `${flat ? `, кв.${flat}` : ''}`;
  };

  return (
    <OrderInputButton
      disabled={!streets.length}
      onPress={() => {
        metrics.pressDeliveryAddress();

        navigation.push(Routes.Address);
      }}
      text={getAddressInfo()}
      iconName="home"
    />
  );
};
