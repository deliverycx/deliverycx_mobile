import React, {FC} from 'react';
import {Tab, Tabs} from '../../../../shared/ui/Tabs';
import {StyleProp, ViewStyle} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const OrderDeliveryType: FC<Props> = ({style}) => {
  return (
    <Tabs style={style} onChange={() => {}} value="test2">
      <Tab name="test" text="Доставка" />
      <Tab name="test2" text="Самовывоз" />
    </Tabs>
  );
};
