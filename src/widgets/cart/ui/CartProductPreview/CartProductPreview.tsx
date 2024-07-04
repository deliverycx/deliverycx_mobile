import React, {FC} from 'react';
import {Text, View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Product, getProductWeightText} from '../../../../entities/products';
import {Counter} from '../../../../shared/ui/Counter';
import {COLORS} from '../../../../shared/styles';
import {getFormatPrice} from '../../../../shared/utils/getFormatPrice';
import {useCartStore} from '../../../../entities/cart';

type Props = {
  data: Product;
  count: number;
  style?: StyleProp<ViewStyle>;
};

export const CartProductPreview: FC<Props> = ({data, count, style}) => {
  const {image, price, name, measureUnit, weight, productId} = data;

  const updateCartItem = useCartStore(state => state.updateItem);

  const handleCounterChange = (nextCount: number) => {
    updateCartItem(productId, nextCount);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <FastImage
        style={styles.img}
        resizeMode="contain"
        source={{uri: image}}
      />
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <Text numberOfLines={2} style={styles.name}>
            {name}
          </Text>
          <Text style={styles.price}>{getFormatPrice(price)}</Text>
        </View>
        <View style={styles.bottomInfo}>
          <Text style={styles.unit}>
            {getProductWeightText(measureUnit, weight)}
          </Text>
          <Counter value={count} onChange={handleCounterChange} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: COLORS.backgroundPrimary,
    borderRadius: 18,
    flexDirection: 'row',
    gap: 10,
  },
  img: {
    width: 80,
    height: 80,
    marginLeft: -4,
    marginTop: -4,
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 10,
    gap: 10,
  },
  topInfo: {
    gap: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: '500',
    fontSize: 14,
    minHeight: 34,
  },
  bottomInfo: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: '500',
    color: COLORS.main,
  },
  unit: {
    fontSize: 12,
    color: COLORS.textPrimary,
    marginTop: 5,
  },
});
