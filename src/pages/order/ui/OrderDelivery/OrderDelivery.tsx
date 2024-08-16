import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {OrderInputButton} from '../OrderInputButton';
import {OrderDeliveryTime} from '../OrderDeliveryTime';
import {Label} from '../../../../shared/ui/Label';
import {Routes, StackParamList} from '../../../../shared/routes';

type AddressScreenNavigationProp = NavigationProp<StackParamList, Routes.Order>;

export const OrderDelivery = () => {
  const navigation = useNavigation<AddressScreenNavigationProp>();

  const handleAddressPress = () => {
    navigation.navigate(Routes.Address);
  };

  return (
    <View style={styles.wrapper}>
      <OrderInputButton
        onPress={handleAddressPress}
        text="Лобня, улица Победы 18"
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
