import React, {useLayoutEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes, StackParamList} from '../../../../shared/routes';
import {useGetOrderQuery} from '../../../../entities/order';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Order>;
  route: RouteProp<StackParamList, Routes.OrderStatus>;
};

export const OrderStatus = ({navigation, route}: Props) => {
  const {hash} = route.params;

  const {data} = useGetOrderQuery(
    {hash},
    {
      refetchInterval: 1000,
    },
  );

  useLayoutEffect(() => {}, [data]);

  console.log(data, hash);

  return (
    <SafeAreaView>
      <Text>заказ формируется {route.params.hash}</Text>
    </SafeAreaView>
  );
};
