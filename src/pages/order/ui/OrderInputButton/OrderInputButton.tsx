import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../../shared/styles';
import {Icon} from '../../../../shared/ui/Icon';

type Props = {
  text: string;
  iconName?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const OrderInputButton: FC<Props> = ({
  text,
  iconName,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.left}>
        {iconName && <Icon name={iconName} />}
        <Text>{text}</Text>
      </View>
      <Icon name="navigate-next" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: COLORS.backgroundTertiary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
