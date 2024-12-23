import React, {FC} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {COLORS} from '../../../../shared/styles';
import {Icon} from '../../../../shared/ui/Icon';
import {phoneByNumber} from '../../../../shared/utils/phoneByNumber';
import {useCurrentOrg} from '../../hooks/useCurrentOrg';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const OrgCallButton: FC<Props> = ({style}) => {
  const {data} = useCurrentOrg();

  const onButtonPress = () => {
    phoneByNumber(data!.phone);
  };

  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onButtonPress}>
      <Icon style={styles.icon} name="call" />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    color: COLORS.main,
  },
});
