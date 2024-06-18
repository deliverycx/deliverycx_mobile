import React, {type FC, type PropsWithChildren} from 'react';
import {View, StyleSheet, type ViewStyle, type StyleProp} from 'react-native';
import {MAIN_INDENT} from '../../styles/indents';

type Props = {
  style?: StyleProp<ViewStyle>;
} & PropsWithChildren;

export const Container: FC<Props> = ({children, style}) => {
  return <View style={[styles.wrapper, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    paddingRight: MAIN_INDENT,
    paddingLeft: MAIN_INDENT,
  },
});
