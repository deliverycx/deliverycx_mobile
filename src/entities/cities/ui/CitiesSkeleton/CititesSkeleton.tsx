import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {INDENTS} from '../../../../shared/styles';
import {Container} from '../../../../shared/ui/Container';

const values = new Array(20).fill(null);

export const CitiesSkeleton = () => {
  return (
    <Container style={styles.container}>
      {values.map((_, index) => (
        <ShimmerPlaceHolder
          width={Dimensions.get('window').width - INDENTS.main * 2}
          style={styles.item}
          key={index}
          LinearGradient={LinearGradient}
        />
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    gap: 20,
  },
  item: {
    height: 40,
    borderRadius: 10,
  },
});
