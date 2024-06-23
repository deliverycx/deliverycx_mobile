import React, {type FC, useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Container} from '../../../../shared/ui/Container';
import {Button} from '../../../../shared/ui/Button';
import {Counter} from '../../../../shared/ui/Counter';
import {DownButton} from '../../../../shared/ui/DownButton';
import {Modal} from '../../../../shared/ui/Modal';
import {COLORS, INDENTS} from '../../../../shared/styles';
import {getFormatPrice} from '../../../../shared/utils/getFormatPrice';
import {hapticFeedback} from '../../../../shared/utils/hapticFeedback';
import {getProductWeightText} from '../../utils/getProductWeightText';
import {Product} from '../../types/productsTypes';
import {getImageUri} from '../../utils/getImageUri';

interface Props {
  data: Product;
  onClosed: () => void;
  onBuyPress: (id: string, count: number) => void;
  count?: number;
}

const INITIAL_COUNT = 1;
const SNAP_POINTS = ['100%'];

export const ProductCard: FC<Props> = ({
  onClosed,
  onBuyPress,
  count: outerCount = 1,
  data: {name, description, price, weight, image, id, measureUnit},
}) => {
  const [count, setCount] = useState(outerCount ?? INITIAL_COUNT);

  const modalRef = useRef<BottomSheetModalMethods | null>(null);

  useEffect(() => {
    modalRef.current?.present();
  }, []);

  const handleCounterChange = (nextCount: number) => {
    setCount(Math.max(INITIAL_COUNT, nextCount));
  };

  const handleBuyPress = () => {
    hapticFeedback('impactHeavy');
    onBuyPress(id, count);
    onClosed();
  };

  const handleBottomSheetModalChange = (index: number) => {
    if (index !== -1) {
      return;
    }

    onClosed();
  };

  const totalPrice = price * count;

  return (
    <Modal
      handleIndicatorStyle={styles.indicatorStyles}
      footerComponent={() => (
        <Container style={styles.footerContainer}>
          <Button
            onPress={handleBuyPress}
            text={`Купить за ${getFormatPrice(totalPrice)}`}
          />
        </Container>
      )}
      ref={modalRef}
      snapPoints={SNAP_POINTS}
      onChange={handleBottomSheetModalChange}>
      <SafeAreaView style={styles.safeAreaView}>
        <Container style={styles.wrapper}>
          <DownButton onPress={onClosed} style={styles.downButton} />
          <FastImage
            resizeMode="contain"
            style={styles.img}
            source={{uri: getImageUri(image)}}
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.counterWrapper}>
            <Text style={styles.weight}>
              {getProductWeightText(measureUnit, weight)}
            </Text>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Counter
                  size="md"
                  value={count}
                  onChange={handleCounterChange}
                />
              </View>
            </View>
          </View>
        </Container>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  indicatorStyles: {
    display: 'none',
  },
  safeAreaView: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    gap: 16,
  },
  downButton: {
    position: 'absolute',
    zIndex: 9,
    left: INDENTS.main,
  },
  modalStyle: {
    minHeight: '100%',
  },
  img: {
    height: 400,
    width: null,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  footerContainer: {
    paddingBottom: 46,
    paddingTop: 16,
  },
  weight: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  counterWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
