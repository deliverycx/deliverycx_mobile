import {TextInput, TextInputProps, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {COLORS} from '../../styles';

type Props = TextInputProps;

export const Input: FC<Props> = ({style, ...props}) => {
  return <TextInput {...props} style={[styles.wrapper, style]} />;
};

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: COLORS.borderSecondary,
    padding: 10,
    paddingLeft: 14,
    backgroundColor: COLORS.backgroundPrimary,
    borderRadius: 10,
  },
});
