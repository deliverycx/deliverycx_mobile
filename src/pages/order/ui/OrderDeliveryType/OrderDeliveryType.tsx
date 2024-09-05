import React, {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Tab, Tabs} from '../../../../shared/ui/Tabs';
import {OrderType} from '../../../../shared/types/order';

type Props = {
  style?: StyleProp<ViewStyle>;
  value: OrderType;
  onChange: (orderType: string) => void;
};

export const OrderDeliveryType: FC<Props> = ({style, onChange, value}) => {
  return (
    <Tabs style={style} onChange={onChange} value={value}>
      <Tab name={OrderType.Pickup} text="Самовывоз" />
      <Tab name={OrderType.Courier} text="Доставка" />
    </Tabs>
  );
};
