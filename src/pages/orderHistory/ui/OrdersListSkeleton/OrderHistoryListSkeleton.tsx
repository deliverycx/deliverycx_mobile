import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const OrderHistoryListSkeleton = () => {
  return (
    <View style={styles.skeletonWrapper}>
      <ShimmerPlaceHolder style={styles.item} LinearGradient={LinearGradient} />
      <ShimmerPlaceHolder style={styles.item} LinearGradient={LinearGradient} />
      <ShimmerPlaceHolder style={styles.item} LinearGradient={LinearGradient} />
      <ShimmerPlaceHolder style={styles.item} LinearGradient={LinearGradient} />
      <ShimmerPlaceHolder style={styles.item} LinearGradient={LinearGradient} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonWrapper: {
    marginVertical: 10,
    borderRadius: 18,
    gap: 10,
    marginHorizontal: 10,
  },
  item: {
    width: '100%',
    height: 180,
    borderRadius: 16,
  },
});
