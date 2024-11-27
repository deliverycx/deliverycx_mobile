import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useGetOrdersQuery} from '../../../../entities/order';
import {useUserStore} from '../../../../entities/user';
import {Container} from '../../../../shared/ui/Container';
import {InfoStatus} from '../../../../shared/ui/InfoStatus';
import {OrderHistoryItem} from '../OrderHistoryItem';

export const OrderHistory = () => {
  const userId = useUserStore(state => state.user?.id);
  const bottomTabBarHeight = useBottomTabBarHeight();

  const {data, isFetching} = useGetOrdersQuery(
    {userId: userId!},
    {enabled: !!userId},
  );

  if (!data?.length && !isFetching) {
    return (
      <Container
        style={[styles.noProducts, {marginBottom: bottomTabBarHeight}]}>
        <InfoStatus
          variant="sad"
          text="Вы ещё ничего не заказывали."
          desc="Чтобы совершить заказ, выберете себе что‑нибудь вкусное на главной странице"
        />
      </Container>
    );
  }

  return (
    <ScrollView style={[styles.wrapper, {marginBottom: bottomTabBarHeight}]}>
      <View style={styles.ordersList}>
        {data?.map(item => (
          <OrderHistoryItem key={item.orderNumber} order={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 0,
  },
  noProducts: {
    flex: 1,
    justifyContent: 'center',
  },
  ordersList: {
    marginVertical: 10,
    gap: 10,
  },
});
