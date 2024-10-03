import React, {FC, useMemo} from 'react';
import {View} from 'react-native';
import {PaymentMethod} from '../../../../shared/types/order';
import {Label} from '../../../../shared/ui/Label';
import {OrderInputButton} from '../OrderInputButton';

type Props = {
  value: PaymentMethod;
  onPress: () => void;
};

export const OrderPaymentMethod: FC<Props> = ({onPress, value}) => {
  const text = useMemo(() => {
    return value === PaymentMethod.Cash ? 'Наличными' : 'Банковской картой';
  }, [value]);

  return (
    <View>
      <Label text="Оплата" />
      <OrderInputButton onPress={onPress} iconName="payments" text={text} />
    </View>
  );
};
