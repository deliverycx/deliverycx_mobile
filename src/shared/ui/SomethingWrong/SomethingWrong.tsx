import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SadKhinkal} from '../CustomIcons/SadKhinkal';

type Props = {
  text: string;
};

export const SomethingWrong: FC<Props> = ({text}) => {
  return (
    <View style={styles.wrapper}>
      <SadKhinkal />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});
