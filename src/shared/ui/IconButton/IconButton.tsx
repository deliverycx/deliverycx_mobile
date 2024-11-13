import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Props as ButtonProps,
  Size as ButtonSize,
  Variant as ButtonVariant,
} from '../Button';
import {Icon} from '../Icon';

type Props = {
  iconName: string;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
};

export const IconButton: FC<Props> = ({
  size = ButtonSize.sm,
  iconName,
  variant = ButtonVariant.primary,
}) => {
  const getColor = () => {
    if (variant === ButtonVariant.primary) {
      return 'white';
    }

    return;
  };

  const getSize = () => {
    if (size === ButtonSize.md) {
      return 'md';
    }

    return 'sm';
  };

  return (
    <Button
      style={styles.button}
      size={size}
      variant={variant}
      leftAddons={<Icon name={iconName} size={getSize()} color={getColor()} />}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    aspectRatio: 1,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
