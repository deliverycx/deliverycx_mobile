import React, {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {OrderModel, OrderStatus} from '../../../../entities/order';
import {COLORS} from '../../../../shared/styles';
import {Container} from '../../../../shared/ui/Container';
import {ProductImageSizer} from '../../../../shared/ui/ProductImageSizer';
import {getFormatPrice} from '../../../../shared/utils/getFormatPrice';

type Props = {
  order: OrderModel;
};

export const OrderHistoryItem: FC<Props> = ({order}) => {
  const getFormatOrderStatus = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Success:
        return (
          <Text style={[styles.statusValue, {color: COLORS.success}]}>
            Завершён
          </Text>
        );
      case OrderStatus.Error:
        return (
          <Text style={[styles.statusValue, {color: COLORS.main}]}>
            Не выполнен
          </Text>
        );
    }
  };

  return (
    <Container key={order.orderNumber} style={styles.orderCart}>
      <View style={styles.orderTitle}>
        <Text style={styles.orderNumber}>Заказ №{order.orderNumber}</Text>
        <Text style={styles.orderDate}>{order.orderParams.date}</Text>
      </View>
      <View style={styles.orderStatus}>
        <Text style={styles.statusLabel}>Статус</Text>
        {getFormatOrderStatus(order.orderStatus)}
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        style={styles.products}>
        {order.orderItems.map(product => (
          <ProductImageSizer
            key={product.id}
            style={styles.img}
            source={{
              uri: product.productImage,
            }}
          />
        ))}
      </ScrollView>
      <View style={styles.divider} />
      <View style={styles.orderPrice}>
        <Text style={styles.priceLabel}>Итого</Text>
        <Text style={styles.priceValue}>
          {getFormatPrice(order.orderParams.orderTotalAmount)}
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  orderCart: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: COLORS.backgroundPrimary,
    marginHorizontal: 10,
    gap: 10,
  },
  orderTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumber: {
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  orderDate: {
    fontWeight: '500',
    color: COLORS.textTertiary,
  },
  orderStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  statusValue: {
    fontWeight: '500',
  },
  img: {
    width: 50,
    height: 50,
    marginHorizontal: 4,
  },
  products: {
    marginHorizontal: -20,
    flexDirection: 'row',
    gap: 7,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.border,
    marginVertical: 5,
  },
  orderPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  priceValue: {
    fontWeight: '500',
    color: COLORS.main,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
});
