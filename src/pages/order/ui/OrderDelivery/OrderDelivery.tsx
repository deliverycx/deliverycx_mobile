import React, {FC, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {OrderInputButton} from '../OrderInputButton';
import {OrderDeliveryTime} from '../OrderDeliveryTime';
import {Label} from '../../../../shared/ui/Label';
import {Address, Routes, StackParamList} from '../../../../shared/routes';
import {useStreets} from '../../../address/hooks/useStreets';
import {useOrgCity} from '../../../../entities/organisations';

type Props = {
  data: Address | undefined;
};

type AddressScreenNavigationProp = NavigationProp<StackParamList, Routes.Order>;

export const OrderDelivery: FC<Props> = ({data}) => {
  const streets = useStreets();
  const navigation = useNavigation<AddressScreenNavigationProp>();

  const org = useOrgCity();

  const handleAddressPress = () => {
    navigation.navigate(Routes.Address);
  };

  const addressText = useMemo(() => {
    if (!data) {
      return 'Выберите адрес';
    }

    return `${org}, ${data.street}, ${data.house}`;
  }, [data, org]);

  return (
    <View style={styles.wrapper}>
      <OrderInputButton
        disabled={!streets.length}
        onPress={handleAddressPress}
        text={addressText}
      />
      <OrderDeliveryTime />
      <View>
        <Label text="Оплата" />
        <OrderInputButton iconName="payments" text="Наличными" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    gap: 20,
  },
});
