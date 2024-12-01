import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {INDENTS} from '../../../../shared/styles';

const width = Dimensions.get('window').width - INDENTS.main;

export const OrderHistoryListSkeleton = () => {
  return (
    <View style={styles.skeletonWrapper}>
      <ShimmerPlaceHolder
        width={width}
        style={styles.item}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceHolder
        width={width}
        style={styles.item}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceHolder
        width={width}
        style={styles.item}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceHolder
        width={width}
        style={styles.item}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceHolder
        width={width}
        style={styles.item}
        LinearGradient={LinearGradient}
      />
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
    height: 180,
    borderRadius: 16,
    flex: 1,
  },
});
