import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import {OrderDeliveryType} from '../OrderDeliveryType';
import {Container} from '../../../../shared/ui/Container';
import {Button} from '../../../../shared/ui/Button';
import {hexToRgba} from '../../../../shared/utils/hexToRgba';
import {COLORS} from '../../../../shared/styles';
import {Routes, StackParamList} from '../../../../shared/routes';
import {OrderType, PaymentMethod} from '../../../../shared/types/order';
import {OrderDeliveryTime} from '../OrderDeliveryTime';
import {OrderAddress} from '../OrderAddress/OrderAddress';
import {useCartItems} from '../../../../widgets/cart';
import {getFormatPrice} from '../../../../shared/utils/getFormatPrice.ts';
import {OrderPaymentMethod} from '../OrderPaymentMethod';

type Props = {
  route: RouteProp<StackParamList, Routes.Order>;
  navigation: NativeStackNavigationProp<StackParamList, Routes.Order>;
};

type OrderForm = {
  orderType: OrderType;
};

export const Order: FC<Props> = ({route, navigation}) => {
  const address = route.params?.address;
  const paymentMethod = route.params?.paymentMethod ?? PaymentMethod.Cash;

  const {control, watch} = useForm<OrderForm>({
    defaultValues: {
      orderType: OrderType.Pickup,
    },
  });

  const {data} = useCartItems();

  const watchField = watch('orderType');

  return (
    <>
      <View style={styles.wrapper}>
        <Container style={styles.container}>
          <Controller
            name="orderType"
            control={control}
            render={({field: {value, onChange}}) => {
              return <OrderDeliveryType value={value} onChange={onChange} />;
            }}
          />
          <View style={styles.actionsTop}>
            {watchField === OrderType.Courier && (
              <OrderAddress
                address={address}
                onAddressPress={() => navigation.push(Routes.Address)}
              />
            )}
            <OrderDeliveryTime />
            <OrderPaymentMethod
              value={paymentMethod}
              onPress={() => navigation.push(Routes.Payment)}
            />
          </View>
        </Container>
        <SafeAreaView style={styles.footer}>
          <Container>
            <View style={styles.footerInfo}>
              <Text style={styles.footerText}>Стоимость заказа</Text>
              <Text style={styles.footerText}>
                {getFormatPrice(data?.totalPrice ?? 0)}
              </Text>
            </View>
            <Button text="Оформить заказ" />
          </Container>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  container: {
    gap: 16,
    marginVertical: 16,
  },
  input: {
    height: 140,
    borderWidth: 1,
    padding: 10,
    backgroundColor: COLORS.backgroundPrimary,
    borderRadius: 16,
  },
  footerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: hexToRgba(COLORS.backgroundTertiary, 0.6),
  },
  actionsTop: {
    marginTop: 10,
    gap: 20,
  },
});
