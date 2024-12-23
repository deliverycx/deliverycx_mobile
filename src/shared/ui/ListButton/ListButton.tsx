import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {COLORS} from '../../styles';
import {Icon} from '../Icon';

type Props = {
  text: string;
} & TouchableOpacityProps;

export const ListButton: FC<Props> = ({text, style, ...props}) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, style]}>
      <Text style={styles.text}>{text}</Text>
      <Icon style={styles.icon} name="navigate-next" />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  icon: {
    color: COLORS.iconPrimary,
  },
});
