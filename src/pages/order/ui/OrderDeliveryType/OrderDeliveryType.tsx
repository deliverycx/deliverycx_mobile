import React, {FC} from 'react';
import {Alert, StyleProp, ViewStyle} from 'react-native';
import {
  useCurrentOrgStore,
  useExtendedOrgStatus,
} from '../../../../entities/organisations';
import {OrderType} from '../../../../shared/types/order';
import {Tab, Tabs} from '../../../../shared/ui/Tabs';

type Props = {
  style?: StyleProp<ViewStyle>;
  value: OrderType;
  onChange: (orderType: string) => void;
};

export const OrderDeliveryType: FC<Props> = ({style, onChange, value}) => {
  const currentOrgId = useCurrentOrgStore(state => state.orgId);

  const {delivery} = useExtendedOrgStatus(currentOrgId!, {
    enabled: !!currentOrgId,
  });

  const handleChange = (nextValue: string) => {
    if (delivery || nextValue === OrderType.Pickup) {
      onChange(nextValue);
    }

    Alert.alert(
      'В этом завдении доступен только самовывоз',
      'Если вы хотите оформить доставку курьером - попробуйте выбрать другое ближайшее заведение',
      [{text: 'Хорошо'}],
    );
  };

  return (
    <Tabs style={style} onChange={handleChange} value={value}>
      <Tab name={OrderType.Pickup} text="Самовывоз" />
      <Tab name={OrderType.Courier} text="Доставка" />
    </Tabs>
  );
};
