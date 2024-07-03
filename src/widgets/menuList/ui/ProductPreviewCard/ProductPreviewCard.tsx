import React, {type FC, useRef, useState} from 'react';
import FastImage, {Priority} from 'react-native-fast-image';
import {
  type StyleProp,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  Easing,
  type ViewStyle,
} from 'react-native';
import {COLORS} from '../../../../shared/styles';
import {getFormatPrice} from '../../../../shared/utils/getFormatPrice';
import {hapticFeedback} from '../../../../shared/utils/hapticFeedback';
import {ProductCard} from '../ProductCard';
import {Product} from '../../../../entities/products';
import {Button} from '../../../../shared/ui/Button';
import {getProductWeightText} from '../../utils/getProductWeightText';
import {Counter} from '../../../../shared/ui/Counter';
import {useCartStore} from '../../../../entities/cart';

interface Props {
  data: Product;
  style?: StyleProp<ViewStyle>;
  imagePriority?: Priority;
}

export const ProductPreviewCard: FC<Props> = ({data, style, imagePriority}) => {
  const {name, price, image, weight, measureUnit} = data;

  const updateItemInCart = useCartStore(state => state.updateItem);
  const cartCount = useCartStore(state => state.getCountById(data.id));

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

  const handleFastBuyPress = () => {
    hapticFeedback('impactHeavy');
    updateItemInCart(data.id, 1);
  };

  const handleItemPress = () => {
    setIsProductModalShown(true);
  };

  const handleProductCardClosed = () => {
    setIsProductModalShown(false);
  };

  const handleCountChange = (nextValue: number) => {
    updateItemInCart(data.id, nextValue);
  };

  return (
    <>
      <Animated.View style={[{transform: [{scale: scaleRef}]}]}>
        <Pressable
          onPress={handleItemPress}
          onPressOut={onPressOut}
          onPressIn={onPressIn}>
          <View style={[styles.wrapper, style]}>
            <View>
              <FastImage
                resizeMode="contain"
                style={styles.img}
                source={{
                  uri: image,
                  priority: imagePriority,
                }}
              />
              <View style={styles.body}>
                <Text numberOfLines={2} style={styles.name}>
                  {name}
                </Text>
              </View>
            </View>
            <View style={styles.buttonWrapper}>
              <View style={styles.priceAndUnit}>
                <Text style={styles.unit}>
                  {getProductWeightText(measureUnit, weight)}
                </Text>
                <Text style={styles.price}>{getFormatPrice(price)}</Text>
              </View>
              {cartCount > 0 ? (
                <Counter
                  size="sm"
                  value={cartCount}
                  onChange={handleCountChange}
                />
              ) : (
                <Button
                  onPress={handleFastBuyPress}
                  size="sm"
                  variant="tertiary"
                  text="+ Добавить"
                />
              )}
            </View>
          </View>
        </Pressable>
        {isProductModalShown && (
          <ProductCard data={data} onClosed={handleProductCardClosed} />
        )}
      </Animated.View>
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
  img: {
    height: 150,
  },
  body: {
    paddingHorizontal: 10,
  },
  name: {
    fontWeight: '500',
    fontSize: 14,
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
});
