import React, {type FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../styles';
import {hapticFeedback} from '../../utils/hapticFeedback';
import {Icon} from '../Icon';

const enum Size {
  md = 'md',
  sm = 'sm',
}

interface Props {
  value: number;
  onChange: (nextValue: number) => void;
  size?: keyof typeof Size;
  style?: StyleProp<ViewStyle>;
}

export const Counter: FC<Props> = ({
  value = 1,
  onChange,
  size = Size.sm,
  style,
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
    onChange(value + 1);
  };

  return (
    <View style={[styles.wrapper, sizeWrapperStyles[size], style]}>
      <TouchableOpacity style={sizeButtonStyles[size]} onPress={handleDec}>
        <Icon name="remove" size={size} />
      </TouchableOpacity>
      <Text style={styles.text}>{value}</Text>
      <TouchableOpacity style={sizeButtonStyles[size]} onPress={handleInc}>
        <Icon name="add" size={size} />
      </TouchableOpacity>
    </View>
  );
};

const sizeWrapperStyles = StyleSheet.create({
  sm: {
    gap: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    minWidth: 100,
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
});
