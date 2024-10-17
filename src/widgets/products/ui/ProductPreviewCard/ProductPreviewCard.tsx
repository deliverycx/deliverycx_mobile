import React, {useRef, useState, type FC} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {Priority} from 'react-native-fast-image';
import {useCartManager} from '../../../../entities/cart';
import {useCurrentOrgStore} from '../../../../entities/organisations';
import {getProductWeightText} from '../../../../entities/products';
import {useUserStore} from '../../../../entities/user';
import {COLORS} from '../../../../shared/styles';
import {FullProduct} from '../../../../shared/types/productTypes';
import {Button} from '../../../../shared/ui/Button';
import {Counter} from '../../../../shared/ui/Counter';
import {getFormatPrice} from '../../../../shared/utils/getFormatPrice';
import {hapticFeedback} from '../../../../shared/utils/hapticFeedback';
import {ProductCard} from '../ProductCard';
import {ProductImage} from '../ProductImage';

interface Props {
  data: FullProduct;
  style?: StyleProp<ViewStyle>;
  imagePriority?: Priority;
}

export const ProductPreviewCard: FC<Props> = ({data, style, imagePriority}) => {
  const {name, price, weight, measureUnit, stopped} = data;

  const orgId = useCurrentOrgStore(state => state.orgId);
  const user = useUserStore(state => state.user);

  const {manage, count} = useCartManager({
    orgId: orgId!,
    userId: user?.id!,
    product: data,
  });

  const [isProductModalShown, setIsProductModalShown] = useState(false);

  const scaleRef = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(scaleRef, {
      toValue: 0.9,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleRef, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleFastBuyPress = async () => {
    hapticFeedback('impactHeavy');
    await manage(1);
  };

  const handleItemPress = () => {
    if (stopped) {
      return;
    }

    setIsProductModalShown(true);
  };

  const handleProductCardClosed = () => {
    setIsProductModalShown(false);
  };

  const handleCountChange = async (nextValue: number) => {
    await manage(nextValue);
  };

  return (
    <>
      <Animated.View style={[!stopped && {transform: [{scale: scaleRef}]}]}>
        <Pressable
          onPress={handleItemPress}
          onPressOut={onPressOut}
          onPressIn={onPressIn}>
          <View style={[styles.wrapper, style]}>
            <View>
              <ProductImage imagePriority={imagePriority} data={data} />
              <View style={[styles.body, stopped && styles.stopped]}>
                <Text numberOfLines={2} style={styles.name}>
                  {name}
                </Text>
              </View>
            </View>
            <View style={[styles.buttonWrapper, stopped && styles.stopped]}>
              <View style={styles.priceAndUnit}>
                <Text style={styles.unit}>
                  {getProductWeightText(measureUnit, weight)}
                </Text>
                <Text style={styles.price}>{getFormatPrice(price)}</Text>
              </View>
              {count > 0 ? (
                <Counter size="sm" value={count} onChange={handleCountChange} />
              ) : (
                <Button
                  disabled={stopped}
                  onPress={handleFastBuyPress}
                  size="sm"
                  variant="tertiary"
                  text={stopped ? 'Будет позже' : '+ Добавить'}
                />
              )}
            </View>
          </View>
        </Pressable>
      </Animated.View>
      {isProductModalShown && (
        <ProductCard data={data} onClosed={handleProductCardClosed} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 270,
    backgroundColor: COLORS.backgroundPrimary,
    borderRadius: 17,
    flex: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  unit: {
    fontSize: 12,
    color: COLORS.textPrimary,
    marginTop: 5,
  },
  body: {
    paddingHorizontal: 10,
  },
  name: {
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  buttonWrapper: {
    padding: 10,
  },
  price: {
    fontWeight: '500',
    color: COLORS.main,
  },
  priceAndUnit: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stopped: {
    opacity: 0.5,
  },
});
