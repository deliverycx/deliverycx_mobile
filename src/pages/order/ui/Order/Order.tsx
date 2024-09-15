import React, {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
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
import {getFormatPrice} from '../../../../shared/utils/getFormatPrice';
import {OrderPaymentMethod} from '../OrderPaymentMethod';
import {Label} from '../../../../shared/ui/Label';
import {Input} from '../../../../shared/ui/Input';
import {InputMask} from '../../../../shared/ui/InputMask';

type Props = {
  route: RouteProp<StackParamList, Routes.Order>;
  navigation: NativeStackNavigationProp<StackParamList, Routes.Order>;
};

type OrderForm = {
  orderType: OrderType;
  deliveryDate?: Date;
  phone: string;
  comment: string;
  name: string;
};

export const Order: FC<Props> = ({route, navigation}) => {
  const address = route.params?.address;
  const paymentMethod = route.params?.paymentMethod ?? PaymentMethod.Cash;

  const headerHeight = useHeaderHeight();

  const {control, watch} = useForm<OrderForm>({
    defaultValues: {
      orderType: OrderType.Pickup,
    },
  });

  const {data} = useCartItems();

  const watchField = watch('orderType');

  const isDelivery = watchField === OrderType.Courier;

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior="padding"
        keyboardVerticalOffset={headerHeight}>
        <ScrollView>
          <Container>
            <Controller
              name="orderType"
              control={control}
              render={({field: {value, onChange}}) => {
                return (
                  <OrderDeliveryType
                    style={styles.deliveryType}
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
            <View style={styles.actionsTop}>
              {isDelivery && (
                <OrderAddress
                  address={address}
                  onAddressPress={() => navigation.push(Routes.Address)}
                />
              )}
              {isDelivery && (
                <Controller
                  name="deliveryDate"
                  control={control}
                  render={({field: {value, onChange}}) => {
                    return (
                      <OrderDeliveryTime value={value} onChange={onChange} />
                    );
                  }}
                />
              )}
              <OrderPaymentMethod
                value={paymentMethod}
                onPress={() => navigation.push(Routes.Payment)}
              />
              <View>
                <Label text="Получатель" />
                <Controller
                  name="name"
                  control={control}
                  render={({field: {value, onChange}}) => {
                    return (
                      <Input
                        autoCapitalize="sentences"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Ваше имя"
                      />
                    );
                  }}
                />
              </View>
              <Controller
                name="phone"
                control={control}
                render={({field: {value, onChange}}) => {
                  return (
                    <InputMask
                      placeholder="Номер телефона"
                      value={value}
                      onChangeText={(_, extracted) => {
                        onChange(extracted);
                      }}
                      mask={'+7 ([000]) [000] [00] [00]'}
                    />
                  );
                }}
              />
              <View>
                <Label text="Комментарии к заказу" />
                <Controller
                  name="comment"
                  control={control}
                  render={({field: {value, onChange}}) => {
                    return (
                      <Input
                        autoCapitalize="sentences"
                        style={styles.textarea}
                        multiline={true}
                        numberOfLines={4}
                        value={value}
                        onChangeText={onChange}
                        placeholder="Вы можеет добавить примечание к заказу"
                      />
                    );
                  }}
                />
              </View>
            </View>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
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
  );
};

const styles = StyleSheet.create({
  inputsWrapper: {
    flex: 1,
    gap: 16,
    marginVertical: 16,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
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
    gap: 20,
  },
  textarea: {
    minHeight: 100,
  },
  deliveryType: {
    marginTop: 10,
    marginBottom: 20,
  },
  keyboardView: {
    flex: 1,
  },
});
