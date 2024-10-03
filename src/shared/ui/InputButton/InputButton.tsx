import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../styles';
import {Input, Props as InputProps} from '../Input';

type Props = {
  label: string;
  style?: StyleProp<ViewStyle>;
} & Omit<InputProps, 'pointerEvents'>;

export const InputButton: FC<Props> = ({label, onPress, style, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      <Text style={styles.text}>{label}</Text>
      <Input
        {...props}
        editable={false}
        pointerEvents="none"
        style={styles.input}
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
