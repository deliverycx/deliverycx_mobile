import React, {FC, useCallback, useMemo} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {Button} from '../../../../shared/ui/Button';
import {useCartProducts} from '../../hooks/useCartProducts';
import {Container} from '../../../../shared/ui/Container';
import {SomethingWrong} from '../../../../shared/ui/SomethingWrong/SomethingWrong';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {CartProductPreview} from '../CartProductPreview';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {useTotalCartPrice} from '../../hooks/useTotalCartPrice';
import {getCountOfProductsAndSum} from '../../utils/getCountOfProductsAndSum';
import {hexToRgba} from '../../../../shared/utils/hexToRgba';

export const CartList: FC = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const products = useCartProducts();
  const {formattedTotalPrice} = useTotalCartPrice();

  const productsWithTitle = useMemo(() => {
    const name = getCountOfProductsAndSum(products.length, formattedTotalPrice);

    return [{id: 'TITLE', name}, ...products];
  }, [products, formattedTotalPrice]);

  const getItemLayout = useCallback((_: unknown, index: number) => {
    const itemHeight = index === 0 ? 71.5 : 120;

    return {
      length: itemHeight,
      offset: itemHeight * index,
      index,
    };
  }, []);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<(typeof productsWithTitle)[number]>) => {
      if (!('count' in item)) {
        return <Text style={styles.totalHeader}>{item.name}</Text>;
      }

      return (
        <View style={styles.cartProductPreview}>
          <CartProductPreview data={item} count={item?.count} />
        </View>
      );
    },
    [],
  );

  const {scrollIndicatorInsets, contentInset} = useMemo(() => {
    return {
      scrollIndicatorInsets: {
        bottom: tabBarHeight,
      },
      contentInset: {
        bottom: tabBarHeight,
      },
    };
  }, [tabBarHeight]);

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
        scrollIndicatorInsets={scrollIndicatorInsets}
        contentInset={contentInset}
        getItemLayout={getItemLayout}
        data={productsWithTitle}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.buttonContainer}>
        <BlurView
          blurType="light"
          blurAmount={10}
          style={styles.blurView}
          reducedTransparencyFallbackColor="white">
          <Container>
            <Button
              onPress={() => {}}
              text={`Оформить заказ на ${formattedTotalPrice}`}
            />
          </Container>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blurView: {
    paddingVertical: 16,
    backgroundColor: hexToRgba(COLORS.backgroundSecondary, 0.6),
  },
  buttonContainer: {
    bottom: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalHeader: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: INDENTS.main,
    paddingBottom: 24,
    paddingTop: 28,
  },
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
