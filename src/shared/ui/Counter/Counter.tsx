import React, {type FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../styles';
import {hapticFeedback} from '../../utils/hapticFeedback';
import {Icon} from '../Icon';

const enum Size {
  md = 'md',
  sm = 'sm',
}

const enum Variant {
  primary = 'primary',
  secondary = 'secondary',
}

interface Props {
  value: number;
  onChange: (nextValue: number) => void;
  size?: keyof typeof Size;
  style?: StyleProp<ViewStyle>;
  variant?: keyof typeof Variant;
  max?: number;
}

export const Counter: FC<Props> = ({
  value = 1,
  onChange,
  size = Size.sm,
  style,
  variant = Variant.primary,
  max,
}) => {
  const runLightHaptics = () => {
    hapticFeedback('impactLight');
  };

  const handleDec = () => {
    runLightHaptics();
    onChange(value - 1);
  };

  const handleInc = () => {
    runLightHaptics();
    onChange(typeof max === 'number' ? Math.min(value + 1, max) : value + 1);
  };

  return (
    <TouchableOpacity
      onPress={event => event.stopPropagation()}
      activeOpacity={1}
      style={[
        styles.wrapper,
        sizeWrapperStyles[size],
        variantWrapperStyles[variant],
        style,
      ]}>
      <TouchableOpacity
        style={[sizeButtonStyles[size], styles.button]}
        onPress={handleDec}>
        <Icon style={styles.icon} name="remove" size={size} />
      </TouchableOpacity>
      <Text style={styles.text}>{value}</Text>
      <TouchableOpacity
        style={[sizeButtonStyles[size], styles.button]}
        onPress={handleInc}>
        <Icon style={styles.icon} name="add" size={size} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const variantWrapperStyles = {
  primary: {
    backgroundColor: COLORS.backgroundTertiary,
  },
  secondary: {
    backgroundColor: COLORS.backgroundSecondary,
  },
};

const sizeWrapperStyles = StyleSheet.create({
  sm: {
    gap: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    minWidth: 100,
    maxHeight: 30,
  },

  md: {
    gap: 10,
    paddingVertical: 4,
    paddingHorizontal: 15,
    minWidth: 140,
  },
});

const sizeButtonStyles = StyleSheet.create({
  sm: {
    paddingVertical: 7,
    paddingHorizontal: 4,
  },

  md: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundTertiary,
    borderRadius: 30,
  },
  text: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  icon: {
    color: COLORS.textPrimary,
  },
  button: {},
});
