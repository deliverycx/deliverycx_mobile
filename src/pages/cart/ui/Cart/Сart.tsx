import React, {FC} from 'react';
import {CartList} from '../../../../widgets/cart';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Cart>;
};

export const Cart: FC<Props> = ({navigation}) => {
  const handleSubmit = () => {
    navigation.push(Routes.Order);
  };

  return <CartList onSubmit={handleSubmit} />;
};
