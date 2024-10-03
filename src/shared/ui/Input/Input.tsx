import React, {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {COLORS} from '../../styles';

export type Props = {
  color?: 'danger';
} & TextInputProps;

export const Input: FC<Props> = ({style, color, ...props}) => {
  return (
    <TextInput
      {...props}
      style={[styles.wrapper, style, color && colorStyles[color]]}
    />
  );
};

const colorStyles = StyleSheet.create({
  danger: {
    borderColor: COLORS.main,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 45,
    borderWidth: 1,
    borderColor: COLORS.borderSecondary,
    padding: 10,
    paddingLeft: 14,
    backgroundColor: COLORS.backgroundPrimary,
    borderRadius: 10,
  },
});
