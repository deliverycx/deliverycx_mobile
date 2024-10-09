import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCartItemsRemove} from '../../../../entities/cart';
import {useOrderFormContext} from '../../../../entities/order';
import {useCurrentOrgStore} from '../../../../entities/organisations';
import {useOrgYaPlaceQuery} from '../../../../entities/organisations/queries/orgYaPlaceQueries';
import {useUserStore} from '../../../../entities/user';
import {TELEGRAM_BOT_URL} from '../../../../shared/consts';
import {useOpenUrl} from '../../../../shared/hooks/useOpenUrl';
import {Routes, StackParamList} from '../../../../shared/routes';
import {Button} from '../../../../shared/ui/Button';
import {InfoStatus} from '../../../../shared/ui/InfoStatus';
import {removeHashData} from '../../../../widgets/orderStatus';

const enum OSInfoVariant {
  error = 'error',
  success = 'success',
}

type Props = {
  variant: keyof typeof OSInfoVariant;
  orderNumber: number | null;
};

export const OrderStatusInfo: FC<Props> = ({variant, orderNumber}) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const orgId = useCurrentOrgStore(state => state.orgId);
  const userId = useUserStore(state => state.user?.id);

  const {data} = useOrgYaPlaceQuery({organization: orgId!});
  const openUrl = useOpenUrl();

  const {reset} = useOrderFormContext();

  const cartRemove = useCartItemsRemove({
    organization: orgId!,
    userid: userId!,
  });

  useEffect(() => {
    removeHashData();
  }, [cartRemove, reset]);

  const isSuccess = variant === OSInfoVariant.success;

  const getText = () => {
    return isSuccess ? 'Спасибо за заказ!' : 'Ошибка при заказе!';
  };

  const getDesc = () => {
    return isSuccess
      ? 'В ближайшее время с вами свявжется наш администратор и уточнит детали заказа.'
      : 'С вами свяжется администратор.';
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuGoPress = async () => {
    cartRemove();
    reset();

    navigation.replace(Routes.TabScreens);
  };

  return (
    <View style={styles.wrapper}>
      <InfoStatus
        text={getText()}
        desc={getDesc()}
        variant={isSuccess ? 'happy' : 'sad'}
      />
      {isSuccess && (
        <Text style={styles.orderNumberWrapper}>
          Номер вашего заказа: №{' '}
          <Text style={styles.orderNumber}>{orderNumber}</Text>
        </Text>
      )}
      <View style={styles.actions}>
        {isSuccess ? (
          <>
            <Button onPress={handleMenuGoPress} text="Перейти в меню" />
            <Button
              onPress={() =>
                openUrl(
                  `https://yandex.ru/sprav/widget/rating-badge/${data?.goodplaceid}?type=award`,
                )
              }
              variant="secondary"
              text="Оставить отзыв"
            />
          </>
        ) : (
          <>
            <Button onPress={handleBackPress} text="Вернуться назад" />
            <Button
              onPress={() => openUrl(TELEGRAM_BOT_URL)}
              variant="secondary"
              text="Сообщить об ошибке"
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 40,
  },
  actions: {
    gap: 10,
  },
  orderNumber: {
    fontWeight: '600',
  },
  orderNumberWrapper: {
    textAlign: 'center',
  },
});
