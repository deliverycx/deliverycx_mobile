import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Routes, StackParamList} from '../../../../shared/routes';
import {CartList, useCartItems} from '../../../../widgets/cart';
import {OrgCloseBanner} from '../../../../widgets/organisations';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Cart>;
};

export const Cart: FC<Props> = ({navigation}) => {
  const {data} = useCartItems();

  const handleSubmit = () => {
    navigation.push(Routes.Order);
  };

  return (
    <View style={styles.wrapper}>
      {!!data?.cart?.length && <OrgCloseBanner />}
      <CartList onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 20,
    paddingTop: 18,
  },
  orgCloseBanner: {
    paddingVertical: 16,
  },
});
