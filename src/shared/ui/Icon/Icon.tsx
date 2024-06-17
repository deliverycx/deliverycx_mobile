import React, {type FC} from 'react';
import {type IconProps} from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ICON_SIZES} from '../../styles';

// I use material icons pack. Take a look at https://fonts.google.com/icons
interface Props extends Omit<IconProps, 'size'> {
  size?: keyof typeof ICON_SIZES;
}

export const Icon: FC<Props> = ({size = 'md', ...props}) => {
  const getIconSize = () => {
    return ICON_SIZES[size];
  };

  return <MaterialIcons {...props} size={getIconSize()} />;
};
