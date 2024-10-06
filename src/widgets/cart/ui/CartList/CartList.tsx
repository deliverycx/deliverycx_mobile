import {BlurView} from '@react-native-community/blur';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {FC, useMemo} from 'react';
import {Controller} from 'react-hook-form';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {
  CutlerySwitcher,
  DozenCounter,
  useIsAddItemMutating,
  useIsAmountItemMutating,
  useIsRemoveItemMutating,
} from '../../../../entities/cart';
import {useOrderFormContext} from '../../../../entities/order';
import {useIsOrgClosed} from '../../../../entities/organisations';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {Button} from '../../../../shared/ui/Button';
import {Container} from '../../../../shared/ui/Container';
import {InfoStatus} from '../../../../shared/ui/InfoStatus';
import {hexToRgba} from '../../../../shared/utils/hexToRgba';
import {useCartItems} from '../../hooks/useCartItems';
import {useTotalCartPrice} from '../../hooks/useTotalCartPrice';
import {getCountOfProductsAndSum} from '../../utils/getCountOfProductsAndSum';
import {CartProductPreview} from '../CartProductPreview';

type Props = {
  onSubmit: () => void;
  style?: StyleProp<ViewStyle>;
  isLoading: boolean;
};

export const CartList: FC<Props> = ({onSubmit, style, isLoading}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const {data} = useCartItems();

  const isAmountItemMutating = useIsAmountItemMutating();
  const isRemoveItemMutating = useIsRemoveItemMutating();
  const isAddItemMutation = useIsAddItemMutating();

  const isCartMutating =
    !!isAmountItemMutating || !!isRemoveItemMutating || !!isAddItemMutation;

  const isOrgClosed = useIsOrgClosed();

  const {formattedTotalPrice} = useTotalCartPrice();

  const {control} = useOrderFormContext();

  const totalHeader = useMemo(() => {
    if (!data?.cart.length) {
      return null;
    }

    return getCountOfProductsAndSum(data.cart.length, formattedTotalPrice);
  }, [data, formattedTotalPrice]);

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

  if (!data?.cart.length) {
    return (
      <Container style={[styles.noProducts, {paddingBottom: tabBarHeight}]}>
        <InfoStatus
          variant="sad"
          text="Ваша корзина пуста"
          desc="Чтобы совершить заказ, выберете себе что‑нибудь вкусное на главной странице"
        />
      </Container>
    );
  }

  return (
    <View style={[styles.wrapper, style]}>
      <ScrollView
        scrollIndicatorInsets={scrollIndicatorInsets}
        contentInset={contentInset}>
        <Text style={styles.totalHeader}>{totalHeader}</Text>
        {data.cart.map(product => (
          <View key={product.productId} style={styles.cartProductPreview}>
            <CartProductPreview data={product} />
          </View>
        ))}
        <View style={styles.cutlerySwitcher}>
          <Controller
            name="devices"
            control={control}
            render={({field: {onChange, value}}) => (
              <CutlerySwitcher count={value} onCountChange={onChange} />
            )}
          />
        </View>
        <View style={styles.dozenCounter}>
          <DozenCounter data={data} />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <BlurView
          blurType="light"
          blurAmount={10}
          style={styles.blurView}
          reducedTransparencyFallbackColor="white">
          <Container>
            <Button
              disabled={!!isOrgClosed}
              loading={isCartMutating || isLoading}
              onPress={onSubmit}
              text={`Оформить заказ на ${formattedTotalPrice}`}
            />
          </Container>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cutlerySwitcher: {
    marginTop: 12,
    marginBottom: 22,
    paddingHorizontal: INDENTS.main,
  },
  dozenCounter: {
    marginTop: 4,
    marginBottom: 10,
    paddingHorizontal: INDENTS.main,
  },
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
    paddingTop: 10,
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
