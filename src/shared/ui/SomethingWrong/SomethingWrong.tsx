import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SadKhinkal} from '../CustomIcons/SadKhinkal';

type Props = {
  text: string;
  desc?: string;
};

export const SomethingWrong: FC<Props> = ({text, desc}) => {
  return (
    <View style={styles.wrapper}>
      <SadKhinkal />
      <View>
        <Text style={styles.text}>{text}</Text>
        {desc && <Text style={styles.desc}>{desc}</Text>}
      </View>
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
  desc: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    maxWidth: 350,
    paddingTop: 10,
  },
});
