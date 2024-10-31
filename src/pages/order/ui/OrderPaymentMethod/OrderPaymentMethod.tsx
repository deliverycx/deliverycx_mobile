import React, {FC} from 'react';
import {View} from 'react-native';
import {PaymentMethod} from '../../../../shared/types/order';
import {Label} from '../../../../shared/ui/Label';
import {OrderInputButton} from '../OrderInputButton';

type Props = {
  value: PaymentMethod;
  onPress: () => void;
};

export const OrderPaymentMethod: FC<Props> = ({onPress, value}) => {
  const getPaymentText = () => {
    if (value === PaymentMethod.Cash) {
      return 'Наличными';
    }

    if (value === PaymentMethod.Card) {
      return 'Картой в приложении';
    }

    if (value === PaymentMethod.ByCard) {
      return 'Картой при получении';
    }

    return 'Выберите способ оплаты';
  };

  return (
    <View>
      <Label text="Оплата" />
      <OrderInputButton
        onPress={onPress}
        iconName="payments"
        text={getPaymentText()}
      />
    </View>
  );
};
