import React, {FC} from 'react';
import {Button} from '../../../../shared/ui/Button';

type Props = {
  onPress: () => void;
};

export const OrderHistoryButton: FC<Props> = ({onPress}) => {
  return <Button onPress={onPress} text="история заказов" />;
};
