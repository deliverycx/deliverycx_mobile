import {OrderInputButton} from '../OrderInputButton';
import React, {FC, useMemo} from 'react';
import {useStreets} from '../../../../widgets/order';
import {useOrgCity} from '../../../../entities/organisations';
import {Address} from '../../../../shared/routes';

type Props = {
  address: Address | undefined;
  onAddressPress: () => void;
};

export const OrderAddress: FC<Props> = ({address, onAddressPress}) => {
  const streets = useStreets();
  const orgCity = useOrgCity();

  const addressText = useMemo(() => {
    if (!address) {
      return 'Выберите адрес';
    }

    return `${orgCity}, ${address.street}, ${address.house}`;
  }, [address, orgCity]);

  return (
    <OrderInputButton
      disabled={!streets.length}
      onPress={onAddressPress}
      text={addressText}
    />
  );
};
