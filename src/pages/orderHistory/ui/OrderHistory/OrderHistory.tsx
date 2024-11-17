import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useGetOrdersQuery} from '../../../../entities/order';
import {useUserStore} from '../../../../entities/user';
import {COLORS} from "../../../../shared/styles.ts";
import {ProductImageSizer} from "../../../../shared/ui/ProductImageSizer";
import {Container} from "../../../../shared/ui/Container";
import {InfoStatus} from "../../../../shared/ui/InfoStatus";

type order = {
  orderId: string,
  date: string,
  status: string,
  totalPrice: string,
  products: string[]
}
export const OrderHistory = () => {
  const userId = useUserStore(state => state.user?.id);

  const history = useGetOrdersQuery({userId: userId!}, {enabled: !!userId});

  const products = [
    'https://16a9564f-f8ec-42ba-a998-3027aa809e50.selstorage.ru/starikhinkalich-co/26130/images/items/94988bb56c15d25a7c178ef94c17192c.PNG',
    'https://16a9564f-f8ec-42ba-a998-3027aa809e50.selstorage.ru/starikhinkalich-co/26130/images/items/610fa5d13c55cbde664c369fc2cb35ee.PNG',
    'https://16a9564f-f8ec-42ba-a998-3027aa809e50.selstorage.ru/starikhinkalich-co/26130/images/items/af8ccba6239938d208c42c5a78365828.PNG',
    'https://16a9564f-f8ec-42ba-a998-3027aa809e50.selstorage.ru/starikhinkalich-co/26130/images/items/b70343ed2e479629e648b0a0102b822f.PNG',
    'https://16a9564f-f8ec-42ba-a998-3027aa809e50.selstorage.ru/starikhinkalich-co/26130/images/items/ecde0bc9baab20ab87d997d669f034cd.PNG',
    'https://16a9564f-f8ec-42ba-a998-3027aa809e50.selstorage.ru/starikhinkalich-co/26130/images/items/bb0b5c230a5f58f5d7fe2fc626d5a049.PNG',
    'https://16a9564f-f8ec-42ba-a998-3027aa809e50.selstorage.ru/starikhinkalich-co/26130/images/items/cab6b3675ca8429b9812b2e8e20c09f1.PNG'
  ]

  const orders: order[] = Array(20).fill({
    orderId: '12345678',
    date: '21.10.2024, 09:55',
    status: 'Доставлен',
    totalPrice: '520₽',
    products,
  });

  const navbarHeight = useBottomTabBarHeight
  const hasOrders = true; // if user hasn't ordered anything, there will be shown special message

  if (!hasOrders) {
    return (
      <Container style={[styles.noProducts, {marginBottom: navbarHeight()}]}>
        <InfoStatus
            variant="sad"
            text="Вы ещё у нас не заказывали"
            desc="Чтобы совершить заказ, выберете себе что‑нибудь вкусное на главной странице"
        />
      </Container>
    )
  }

  return (
    <ScrollView style={[styles.wrapper, {marginBottom: navbarHeight()}]}>
      <View style={styles.ordersList}>
        {orders.map((item) =>
          <Container key={item.orderId} style={styles.orderCart}>
            <View style={styles.orderTitle}>
              <Text style={styles.orderNumber}>Заказ №{item.orderId}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            <View style={styles.orderStatus}>
              <Text style={styles.statusLabel}>Статус</Text>
              <Text style={styles.statusValue}>{item.status}</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.products}>
              {item.products.map((productImg: string) =>
                <ProductImageSizer
                  key={productImg}
                  style={styles.img}
                  resizeMode="contain"
                  source={{
                    uri: productImg,
                  }}
                />
              )}
            </ScrollView>
            <View style={styles.divider} />
            <View style={styles.orderPrice}>
              <Text style={styles.priceLabel}>Итого</Text>
              <Text style={styles.priceValue}>{item.totalPrice}</Text>
            </View>
          </Container>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  ordersList: {
    marginVertical: 10,
    gap: 10,
  },
  noProducts: {
    flex: 1,
    justifyContent: 'center',
  },
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
  orderStatus:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  statusValue:{
    fontWeight: '500',
    color: COLORS.success,
  },
  img: {
    width: 60,
    height: 60,
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
  }
})
