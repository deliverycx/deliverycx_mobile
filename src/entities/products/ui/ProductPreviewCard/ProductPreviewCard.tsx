import React, {type FC, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
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
import {Product} from '../../types/productsTypes';
import {Button} from '../../../../shared/ui/Button';
import {getProductWeightText} from '../../utils/getProductWeightText';
import {Counter} from '../../../../shared/ui/Counter';

interface Props {
  data: Product;
  style?: StyleProp<ViewStyle>;
}

export const ProductPreviewCard: FC<Props> = ({data, style}) => {
  const {name, price, image, weight, measureUnit} = data;

  const [count, setCount] = useState(0);
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
    setCount(1);
  };

  const handleItemPress = () => {
    setIsProductModalShown(true);
  };

  const handleProductCardClosed = () => {
    setIsProductModalShown(false);
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
              {count > 0 ? (
                <Counter size="sm" value={count} onChange={setCount} />
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
          <ProductCard
            onBuyPress={() => {}}
            data={data}
            onClosed={handleProductCardClosed}
          />
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
    height: 160,
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
