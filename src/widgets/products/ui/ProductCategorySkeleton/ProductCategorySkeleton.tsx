import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {COLORS} from '../../../../shared/styles';
import {Container} from '../../../../shared/ui/Container';

export const ProductCategorySkeleton = () => {
  return (
    <Container style={styles.wrapper}>
      <ShimmerPlaceHolder style={styles.item} LinearGradient={LinearGradient} />
      <ShimmerPlaceHolder style={styles.item} LinearGradient={LinearGradient} />
      <ShimmerPlaceHolder style={styles.item} LinearGradient={LinearGradient} />
      <ShimmerPlaceHolder style={styles.item} LinearGradient={LinearGradient} />
      <ShimmerPlaceHolder style={styles.item} LinearGradient={LinearGradient} />
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 9,
    backgroundColor: COLORS.backgroundPrimary,
  },
  item: {
    height: 28,
    width: 80,
    borderRadius: 20,
  },
});
