import React, {type FC, type PropsWithChildren} from 'react';
import {View, StyleSheet, type ViewStyle, type StyleProp} from 'react-native';
import {INDENTS} from '../../styles';

type Props = {
  style?: StyleProp<ViewStyle>;
} & PropsWithChildren;

export const Container: FC<Props> = ({children, style}) => {
  return <View style={[styles.wrapper, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    paddingRight: INDENTS.main,
    paddingLeft: INDENTS.main,
  },
});
