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
  tertiary = 'tertiary',
}

const enum Size {
  sm = 'sm',
  md = 'md',
}

interface Props extends TouchableHighlightProps {
  text: string;
  variant?: keyof typeof Variant;
  size?: keyof typeof Size;
}

const underlayColorPrimary = hexToRgba(COLORS.main, 0.6);
const underlayColorSecondary = hexToRgba(COLORS.main, 0.1);

export const Button: FC<Props> = ({
  text,
  variant = Variant.primary,
  size = Size.md,
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
      style={[styles.wrapper, style, wrapperStyles[variant], sizeStyles[size]]}>
      <Text style={[styles.text, textStyles[variant], textSizeStyles[size]]}>
        {text}
      </Text>
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
  tertiary: {
    color: COLORS.textPrimary,
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 30,
  },
  md: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 40,
  },
});

const textSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
});

const wrapperStyles = {
  primary: {
    backgroundColor: COLORS.main,
  },

  secondary: {
    backgroundColor: hexToRgba(COLORS.main, 0.2),
  },

  tertiary: {
    backgroundColor: COLORS.backgroundTertiary,
  },
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.main,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
