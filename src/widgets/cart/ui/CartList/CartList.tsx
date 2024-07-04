import React, {FC} from 'react';
import {FlatList, Insets, StyleSheet, View} from 'react-native';
import {useCartProducts} from '../../hooks/useCartProducts';
import {Container} from '../../../../shared/ui/Container';
import {SomethingWrong} from '../../../../shared/ui/SomethingWrong/SomethingWrong';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {CartProductPreview} from '../CartProductPreview';
import {INDENTS} from '../../../../shared/styles';

type Props = {
  contentInset?: Insets;
  scrollIndicatorInsets?: Insets;
};

export const CartList: FC<Props> = ({contentInset, scrollIndicatorInsets}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const products = useCartProducts();

  if (products.length === 0) {
    return (
      <Container style={[styles.noProducts, {paddingBottom: tabBarHeight}]}>
        <SomethingWrong
          text="Ваша корзина пуста"
          desc="Чтобы совершить заказ, выберете себе что‑нибудь вкусное на главной странице"
        />
      </Container>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        contentInset={contentInset}
        scrollIndicatorInsets={scrollIndicatorInsets}
        data={products}
        renderItem={({item}) => (
          <View style={styles.cartProductPreview}>
            <CartProductPreview data={item} count={item.count} />
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  noProducts: {
    flex: 1,
    justifyContent: 'center',
  },
  cartProductPreview: {
    marginVertical: 8,
    paddingHorizontal: INDENTS.main,
  },
});
