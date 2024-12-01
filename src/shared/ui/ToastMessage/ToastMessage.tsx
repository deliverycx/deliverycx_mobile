import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../styles.ts';
import {hexToRgba} from '../../utils/hexToRgba.ts';
import {Icon} from '../Icon';

type Props = {
  text?: string;
};

export const ToastMessage: FC<Props> = ({text}) => {
  return (
    <View style={styles.wrapper}>
      <Icon style={styles.icon} name="info" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: hexToRgba(COLORS.backgroundQuaternary, 0.9),
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '70%',
  },
  icon: {
    color: COLORS.textInvert,
  },
  text: {
    color: COLORS.textInvert,
  },
});
