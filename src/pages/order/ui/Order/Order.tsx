import {useHeaderHeight} from '@react-navigation/elements';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {OrderForm, useOrderFormContext} from '../../../../entities/order';
import {useIsOrgClosed} from '../../../../entities/organisations';
import {Routes, StackParamList} from '../../../../shared/routes';
import {COLORS} from '../../../../shared/styles';
import {OrderType} from '../../../../shared/types/order';
import {Button} from '../../../../shared/ui/Button';
import {Container} from '../../../../shared/ui/Container';
import {Input} from '../../../../shared/ui/Input';
import {InputMask} from '../../../../shared/ui/InputMask';
import {Label} from '../../../../shared/ui/Label';
import {getFormatPrice} from '../../../../shared/utils/getFormatPrice';
import {hexToRgba} from '../../../../shared/utils/hexToRgba';
import {useCartItems} from '../../../../widgets/cart';
import {OrgCloseBanner} from '../../../../widgets/organisations';
import {useOrderSubmit} from '../../hooks/useOrderSubmit';
import {OrderAddress} from '../OrderAddress/OrderAddress';
import {OrderDeliveryTime} from '../OrderDeliveryTime';
import {OrderDeliveryType} from '../OrderDeliveryType';
import {OrderPaymentMethod} from '../OrderPaymentMethod';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, Routes.Order>;
};

export const Order: FC<Props> = ({navigation}) => {
  const {control, watch, handleSubmit} = useOrderFormContext<OrderForm>();

  const headerHeight = useHeaderHeight();
  const {data} = useCartItems();

  const {onSubmit, isFetching} = useOrderSubmit();

  const isOrgClosed = useIsOrgClosed();

  const watchField = watch('orderType');

  const isDelivery = watchField === OrderType.Courier;

  const displayedPrice = (isDelivery ? data?.totalPrice : data?.fullPrice) ?? 0;

  return (
    <SafeAreaView style={styles.wrapper}>
      <OrgCloseBanner style={styles.closeBanner} />
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
                <>
                  <OrderAddress />
                  <Controller
                    name="deliveryDate"
                    control={control}
                    render={({field: {value, onChange}}) => {
                      return (
                        <OrderDeliveryTime value={value} onChange={onChange} />
                      );
                    }}
                  />
                </>
              )}
              <Controller
                name="paymentMethod"
                control={control}
                render={({field: {value}}) => {
                  return (
                    <OrderPaymentMethod
                      value={value}
                      onPress={() => {
                        navigation.push(Routes.Payment);
                      }}
                    />
                  );
                }}
              />
              <View>
                <Label text="Получатель" />
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {value, onChange}, formState}) => {
                    return (
                      <Input
                        autoCapitalize="sentences"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Ваше имя *"
                        color={formState.errors.name ? 'danger' : undefined}
                      />
                    );
                  }}
                />
              </View>
              <Controller
                rules={{
                  required: true,
                }}
                name="phone"
                control={control}
                render={({field: {value, onChange}, formState}) => {
                  return (
                    <InputMask
                      placeholder="Номер телефона *"
                      value={value}
                      onChangeText={(_, extracted) => {
                        onChange(`+7${extracted}`);
                      }}
                      keyboardType="phone-pad"
                      mask={'+7 ([000]) [000] [00] [00]'}
                      color={formState.errors.phone ? 'danger' : undefined}
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
                        textAlignVertical="top"
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
            {getFormatPrice(displayedPrice)}
          </Text>
        </View>
        <Button
          disabled={!!isOrgClosed}
          text="Оформить заказ"
          loading={isFetching}
          onPress={handleSubmit(onSubmit)}
        />
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeBanner: {
    marginVertical: 10,
  },
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
