import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Priority} from 'react-native-fast-image';
import {COLORS} from '../../../../shared/styles.ts';
import {FullProduct} from '../../../../shared/types/productTypes';
import {ProductImageSizer} from '../../../../shared/ui/ProductImageSizer';

type Props = {
  data: FullProduct;
  imagePriority?: Priority;
};

export const ProductImage: FC<Props> = ({data, imagePriority}) => {
  const {stopped, image} = data;

  return (
    <View style={styles.wrapper}>
      {stopped && (
        <View style={styles.stoppedWrapper}>
          <View style={styles.stoppedTextWrapper}>
            <Text style={styles.stoppedText}>Упс... Закончилось</Text>
          </View>
        </View>
      )}
      <ProductImageSizer
        resizeMode="contain"
        style={[styles.img, stopped && styles.stopped]}
        source={{
          uri: image,
          priority: imagePriority,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  stoppedWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stoppedTextWrapper: {
    backgroundColor: COLORS.accent,
    padding: 8,
    maxWidth: 150,
    textAlign: 'center',
    borderRadius: 10,
    transform: [{rotateZ: '-8deg'}],
  },
  stoppedText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  img: {
    height: 150,
  },
  stopped: {
    opacity: 0.8,
  },
});
