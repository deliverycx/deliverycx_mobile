import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {Container} from '../../../../shared/ui/Container';

export const ProductsSkeleton = () => {
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
    paddingVertical: 20,
    rowGap: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  item: {
    width: '47%',
    height: 250,
    borderRadius: 16,
  },
});
