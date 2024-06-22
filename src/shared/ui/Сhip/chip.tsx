import React, {type FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';
import {COLORS} from '../../styles';
import {hexToRgba} from '../../utils/hexToRgba';

const enum Variant {
  primary = 'primary',
  secondary = 'secondary',
}

interface Props extends TouchableOpacityProps {
  text: string;
  variant?: keyof typeof Variant;
}

export const Chip: FC<Props> = ({
  text,
  style,
  variant = Variant.primary,
  ...props
}) => {
  const getVariantStyles = (vrt: keyof typeof Variant) => {
    switch (vrt) {
      case Variant.primary: {
        return {
          backgroundColor: COLORS.backgroundTertiary,
        };
      }
      case Variant.secondary: {
        return {
          backgroundColor: hexToRgba(COLORS.main, 0.1),
        };
      }
    }
  };

  const getTextVariantStyles = (vrt: keyof typeof Variant) => {
    switch (vrt) {
      case Variant.primary: {
        return {
          color: COLORS.textSecondary,
        };
      }
      case Variant.secondary: {
        return {
          color: COLORS.main,
        };
      }
    }
  };

  return (
    <TouchableOpacity
      {...props}
      style={[styles.wrapper, getVariantStyles(variant), style]}>
      <Text style={[getTextVariantStyles(variant), styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  text: {
    fontWeight: '500',
    fontSize: 13,
  },
});
