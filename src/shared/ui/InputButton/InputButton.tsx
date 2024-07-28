import React, {FC} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from '../Input';
import {COLORS} from '../../styles';

type Props = {
  label: string;
  value: string;
  onPress: () => void;
};

export const InputButton: FC<Props> = ({label, value, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Text style={styles.text}>{label}</Text>
      <Input
        editable={false}
        pointerEvents="none"
        style={styles.input}
        value={value}
      />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  text: {
    position: 'absolute',
    left: 16,
    top: 8,
    zIndex: 9,
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  input: {
    paddingTop: 26,
    position: 'relative',
  },
});
