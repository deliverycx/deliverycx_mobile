import React, {ReactElement, type FC} from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  type TouchableHighlightProps,
} from 'react-native';
import {COLORS} from '../../styles';
import {hapticFeedback} from '../../utils/hapticFeedback';
import {hexToRgba} from '../../utils/hexToRgba';

export const enum Variant {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  quaternary = 'quaternary',
}

export const enum Size {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
}

export interface Props extends TouchableHighlightProps {
  text?: string;
  variant?: keyof typeof Variant;
  size?: keyof typeof Size;
  loading?: boolean;
  leftAddons?: ReactElement;
  rightAddons?: ReactElement;
}

const underlayColorPrimary = hexToRgba(COLORS.main, 0.6);
const underlayColorSecondary = hexToRgba(COLORS.main, 0.1);

export const Button: FC<Props> = ({
  text,
  variant = Variant.primary,
  size = Size.md,
  style,
  loading = false,
  leftAddons,
  rightAddons,
  disabled,
  onPress,
  ...props
}) => {
  const handlePress = (event: GestureResponderEvent) => {
    hapticFeedback('impactMedium');

    onPress?.(event);
  };

  return (
    <TouchableHighlight
      {...props}
      onPress={handlePress}
      disabled={disabled || loading}
      underlayColor={
        variant === Variant.primary
          ? underlayColorPrimary
          : underlayColorSecondary
      }
      style={[
        styles.wrapper,
        style,
        wrapperStyles[variant],
        sizeStyles[size],
        disabled && styles.disabled,
        loading && styles.disabled,
      ]}>
      {loading ? (
        <ActivityIndicator size={18} color={COLORS.backgroundPrimary} />
      ) : (
        <View style={styles.textWrapper}>
          {leftAddons}
          {text && (
            <Text
              style={[styles.text, textStyles[variant], textSizeStyles[size]]}>
              {text}
            </Text>
          )}
          {rightAddons}
        </View>
      )}
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
  quaternary: {
    color: COLORS.success,
  },
});

const sizeStyles = StyleSheet.create({
  xs: {
    paddingHorizontal: 6,
    borderRadius: 30,
    height: 20,
  },
  sm: {
    paddingHorizontal: 10,
    borderRadius: 30,
    height: 30,
  },
  md: {
    paddingHorizontal: 20,
    borderRadius: 40,
    height: 44,
  },
});

const textSizeStyles = StyleSheet.create({
  xs: {
    fontSize: 12,
  },
  sm: {
    fontSize: 13,
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

  quaternary: {
    backgroundColor: hexToRgba(COLORS.success, 0.2),
  },
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  textWrapper: {
    flex: 1,
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
