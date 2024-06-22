import React, {type FC} from 'react';
import {
  Image,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import {COLORS} from '../../../../shared/styles';
import {getFormatPrice} from '../../../../shared/utils/getFormatPrice';
import {hapticFeedback} from '../../../../shared/utils/hapticFeedback';
import {Product} from '../../types/productsTypes';
import {Button} from '../../../../shared/ui/Button';
import {STATIC_URL} from '../../../../shared/consts';

interface Props {
  data: Product;
  style?: StyleProp<ViewStyle>;
}

export const ProductPreviewCard: FC<Props> = ({data, style}) => {
  const {name, price, image, weight, measureUnit} = data;

  const handleFastBuyPress = () => {
    hapticFeedback('impactHeavy');
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={{
            uri: `${STATIC_URL}/ecomm?origin=${image}`,
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
            {measureUnit === 'шт' ? `1 ${measureUnit}` : `${weight} г`}
          </Text>
          <Text style={styles.price}>{getFormatPrice(price)}</Text>
        </View>
        <Button
          onPress={() => {}}
          size="sm"
          variant="tertiary"
          text="+ Добавить"
        />
      </View>
    </View>
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
