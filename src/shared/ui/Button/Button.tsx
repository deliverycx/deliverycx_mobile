import React, {type FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  type TouchableHighlightProps,
} from 'react-native';
import {COLORS} from '../../styles';
import {hexToRgba} from '../../utils/hexToRgba';

const enum Variant {
  primary = 'primary',
  secondary = 'secondary',
}

interface Props extends TouchableHighlightProps {
  text: string;
  variant?: keyof typeof Variant;
}

const underlayColorPrimary = hexToRgba(COLORS.main, 0.6);
const underlayColorSecondary = hexToRgba(COLORS.main, 0.1);

export const Button: FC<Props> = ({
  text,
  variant = Variant.primary,
  style,
  ...props
}) => {
  return (
    <TouchableHighlight
      {...props}
      underlayColor={
        variant === Variant.primary
          ? underlayColorPrimary
          : underlayColorSecondary
      }
      style={[styles.wrapper, style, wrapperStyles[variant]]}>
      <Text style={[styles.text, textStyles[variant]]}>{text}</Text>
    </TouchableHighlight>
  );
};

const textStyles = StyleSheet.create({
  primary: {
    color: COLORS.textInvert,
  },
  secondary: {
    color: COLORS.main,
  },
});

const wrapperStyles = {
  primary: {
    backgroundColor: COLORS.main,
  },

  secondary: {
    backgroundColor: hexToRgba(COLORS.main, 0.2),
  },
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    fontSize: 40,
    borderRadius: 40,
    backgroundColor: COLORS.main,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
