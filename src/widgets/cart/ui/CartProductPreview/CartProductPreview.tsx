import React, {FC} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {
  CartItem,
  useCartRemove,
  useCartUpdate,
} from '../../../../entities/cart';
import {useCurrentOrgStore} from '../../../../entities/organisations';
import {useUserStore} from '../../../../entities/user';
import {COLORS} from '../../../../shared/styles';
import {Counter} from '../../../../shared/ui/Counter';
import {getFormatPrice} from '../../../../shared/utils/getFormatPrice';

type Props = {
  data: CartItem;
  style?: StyleProp<ViewStyle>;
};

export const CartProductPreview: FC<Props> = ({data, style}) => {
  const {productImage, price, productName, productId, oneprice} = data;

  const orgId = useCurrentOrgStore(state => state.orgId);
  const user = useUserStore(state => state.user);

  const {
    update,
    count,
    controllerRef: updateControllerRef,
  } = useCartUpdate({
    orgId: orgId!,
    userId: user?.id!,
    productId: productId,
  });

  const {remove} = useCartRemove({
    orgId: orgId!,
    userId: user?.id!,
    productId: productId,
  });

  const handleCounterChange = (nextCount: number) => {
    if (nextCount === 0) {
      if (updateControllerRef.current) {
        updateControllerRef.current.abort();
      }
      remove();
    } else {
      update(nextCount);
    }
  };

  return (
    <View style={[styles.wrapper, style]}>
      <FastImage
        style={styles.img}
        resizeMode="contain"
        source={{uri: productImage}}
      />
      <View style={styles.info}>
        <View style={styles.topInfo}>
          <Text numberOfLines={2} style={styles.name}>
            {productName}
          </Text>
          <Text style={styles.price}>{getFormatPrice(price)}</Text>
        </View>
        <View style={styles.bottomInfo}>
          <Text style={styles.unit}>{getFormatPrice(oneprice)} / шт.</Text>
          {count === 0 ? (
            <ShimmerPlaceHolder
              style={styles.counterLoader}
              LinearGradient={LinearGradient}
            />
          ) : (
            <Counter value={count} onChange={handleCounterChange} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  counterLoader: {
    width: 100,
    height: 30,
    borderRadius: 30,
  },
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
